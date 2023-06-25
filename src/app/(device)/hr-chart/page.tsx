"use client"

import { parseHeartRate } from "@/app/utils/parseHRData";
import { useState, useReducer, useRef } from "react";
import { displayCurrentTime } from "@/app/utils/time";
import HRGraph from "@/app/components/HRGraph";

const STATUS = {
    DISCONNECTED: 'disconnected',
    CONNECT: 'connect',
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    DISCONNECTING: 'disconnecting'
}

type State = {
    hrValue: number | null;
    connectonStatus: string;
    timeConnected: string;
}

type Action = {
    type: string;
    payload?: any;
}

type HREvent = Event & {
    target: HREventTarget
    timeStamp: number;
}

type HREventTarget = EventTarget & {
    value: DataView;
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "displayHR":
            return { ...state, hrValue: action.payload };
        case "displayStatus":
            return { ...state, connectonStatus: action.payload };
        case "displayTimeConnected":
            const timeString = `Time connected: ${action.payload}`
            return { 
                ...state, 
                timeConnected: timeString
            };
        default:
            throw new Error();
    }
};

export default function Page() {
    const bluetoothDevice = useRef<BluetoothDevice | undefined>(undefined);
    const [hrGraphData, setHRGraphData] = useState<{ hr: number }[]>([]);
    const [state, dispatch] = useReducer(reducer, {
        hrValue: null,
        connectonStatus: STATUS.CONNECT,
        timeConnected: "Has not yet connected"
    });

    const handleCharacteristicValueChanged = (event: Event) => {
        // console.table(event);
        const hrEvent = event as HREvent;
        const value = hrEvent.target.value;
        const timeStamp = hrEvent.timeStamp;
        const hrData = parseHeartRate(value);
        // console.log('timestamp:', timeStamp);

        dispatch({ type: "displayHR", payload: hrData.heartRate });
        setHRGraphData(prevState => [...prevState, { 'hr': hrData.heartRate }]);

        console.log('Heart Rate:', hrData.heartRate);
        console.log('RR intervals:', hrData.rrIntervals);
    }

    const handleServerDisconnect = () => {
        dispatch({ type: "displayStatus", payload: STATUS.DISCONNECTED });
        bluetoothDevice.current?.gatt?.disconnect();
        console.log('Server disconnected:');
        dispatch({ type: "displayStatus", payload: STATUS.DISCONNECTED });
    }


    const connectBLEDevice = async () => {
        dispatch({ type: "displayStatus", payload: STATUS.CONNECTING });

        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['heart_rate'] }],
            optionalServices: ['device_information', 'battery_service', 'heart_rate'],
        });
        bluetoothDevice.current = device;
        device.addEventListener('gattserverdisconnected', handleServerDisconnect);
        // connect to device
        const server = await device.gatt?.connect();

        const service = await server?.getPrimaryService('heart_rate');
        const characteristic = await service?.getCharacteristic('heart_rate_measurement');
        await characteristic?.startNotifications();
        characteristic?.addEventListener('characteristicvaluechanged',
            handleCharacteristicValueChanged);

        dispatch({ type: "displayStatus", payload: STATUS.CONNECTED });
        dispatch({ type: "displayTimeConnected", payload: displayCurrentTime()});
    }

    return (
        <main className="flex flex-col">
            <div className="flex w-1/2 mx-auto px-1 text-stone-500">
                <div className="flex-1 w-1/2">{state.timeConnected}</div>
                <div className="flex-1 w-1/2 text-right">
                    <button onClick={handleServerDisconnect}>disconnect</button>
                </div>
            </div>                                
            <div className="p-6 text-center mx-auto w-1/2 bg-sky-900 rounded">
                <h1 className="text-3xl text-red-500 text-center mt-10">{state.hrValue} ♥️ </h1>
                <button className="btn btn-info w-1/4 mx-auto mt-10 shadow-lg" onClick={() => connectBLEDevice()}>{state.connectonStatus}</button>
                <HRGraph data={hrGraphData} />
            </div>
        </main>
    )

}