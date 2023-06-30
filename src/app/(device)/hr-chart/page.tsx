"use client"

import Image from "next/image";
import { parseHeartRate } from "@/app/utils/parseHRData";
import { useReducer, useRef } from "react";
import { displayCurrentTime } from "@/app/utils/time";
import HRGraph from "@/app/components/HRGraph";
import { Status } from "@/app/types";
import ExerciseList from "@/app/components/ExerciseList";

const STATUS: { [key: string]: Status } = {
    DISCONNECTED: 'disconnected',
    CONNECTED: 'connected',
    CONNECTING: 'connecting'
};

type State = {
    showExerciseList: boolean;
    hrValue: number | null;
    connectonStatus: string;
    timeConnected: string | null;
    hrGraphData: { hr: number }[];
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
        case "displayExerciseList":
            return { ...state, showExerciseList: action.payload };
        case "displayHR":
            return { ...state, hrValue: action.payload };
        case "displayStatus":
            return { ...state, connectonStatus: action.payload };
        case "displayTimeConnected":
            const timeString = `time connected ${action.payload}`
            return {
                ...state,
                timeConnected: timeString
            };
        case "sendHRGraphData":
            return {
                ...state,
                hrGraphData: [...state.hrGraphData, action.payload]
            };
        default:
            throw new Error();
    }
};

export default function Page() {
    const bluetoothDevice = useRef<BluetoothDevice | undefined>(undefined);
    const [state, dispatch] = useReducer(reducer, {
        showExerciseList: true,
        hrValue: null,
        connectonStatus: STATUS.DISCONNECTED,
        timeConnected: null,
        hrGraphData: []
    });

    const handleCharacteristicValueChanged = (event: Event) => {
        const hrEvent = event as HREvent;
        const value = hrEvent.target.value;
        const hrData = parseHeartRate(value);

        dispatch({ type: "displayHR", payload: hrData.heartRate });
        dispatch({ type: "sendHRGraphData", payload: { 'hr': hrData.heartRate } });
    }

    const handleServerDisconnect = () => {
        dispatch({ type: "displayStatus", payload: STATUS.DISCONNECTED });
        bluetoothDevice.current?.gatt?.disconnect();
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
        dispatch({ type: "displayTimeConnected", payload: displayCurrentTime() });
    }

    return (
        <>
            {state.showExerciseList ? 
                <ExerciseList /> :
                <main className="flex flex-col">
                    <div className="flex w-1/2 mx-auto px-1 text-stone-500">
                        <div className={`flex-1 w-1/2`}>
                            <Image className="opacity-50 inline-block" src={`/icons/bluetooth_${state.connectonStatus}.svg`} alt={`Bluetooth ${state.connectonStatus}`} width="24" height="24" />
                            <span className={`${state.connectonStatus == STATUS.CONNECTED && "text-blue-500"}`}>
                                {state.connectonStatus}
                            </span>
                        </div>
                        <div className="flex-1 w-1/2 text-right">
                            {state.connectonStatus === STATUS.CONNECTED && state.timeConnected}
                        </div>
                    </div>
                    <div className="p-6 text-center mx-auto w-1/2 bg-sky-900 rounded">
                        {state.connectonStatus === STATUS.DISCONNECTED &&
                            <button className={`btn btn-info w-1/4 mx-auto mt-5 shadow-lg`} onClick={connectBLEDevice}>
                                Pair Device
                            </button>
                        }
                        {state.connectonStatus === STATUS.CONNECTED &&
                            <button className={`btn btn-accent w-1/4 mx-auto mt-5 shadow-lg`} onClick={handleServerDisconnect}>
                                Unpair Device
                            </button>
                        }
                        <h1 className="text-3xl text-red-500 text-center mt-5">
                            {state.connectonStatus === STATUS.CONNECTED && state.hrValue} ♥️
                        </h1>
                        {/* HEART RATE GRAPH */}
                        <HRGraph data={state.hrGraphData} />
                    </div>
                </main>
            }
        </>
    )

}