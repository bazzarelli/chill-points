"use client"

import { parseHeartRate } from "@/app/utils/parseHRData";
import { useState, useReducer, useRef } from "react";
import { displayCurrentTime } from "@/app/utils/time";
import GetReady from "./components/GetReady";
import Exercise from "./components/Exercise";
import { CONNECTION_STATUS, DeviceStatus } from "./components/DeviceStatus";
import Summary from "./components/Summary";

enum EXERCISE_STATUS {
  READY = 'ready',
  EXCERCISING = 'excercising',
  COMPLETE = 'complete'
}

type State = {
    hrService: BluetoothRemoteGATTService | undefined;
    hrValue: number | null;
    connectonStatus: string;
    exerciseStatus: EXERCISE_STATUS;
    timeConnected: string | null;
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
        case "hrService": 
            return { ...state, hrService: action.payload }
        case "displayHR":
            return { ...state, hrValue: action.payload };
        case "displayStatus":
            return { ...state, connectonStatus: action.payload };
        case "displayTimeConnected":
            const timeString = `connected since ${action.payload}`
            return {
                ...state,
                timeConnected: timeString
            };
        case "exerciseStatus": 
        return { ...state, exerciseStatus: action.payload };
        default:
            throw new Error();
    }
};

export default function Page() {
    const bluetoothDevice = useRef<BluetoothDevice | undefined>(undefined);
    const [hrGraphData, setHRGraphData] = useState<{ hr: number }[]>([]);
    const [state, dispatch] = useReducer(reducer, {
        hrValue: null,
        hrService: undefined,
        connectonStatus: CONNECTION_STATUS.DISCONNECTED,
        exerciseStatus: EXERCISE_STATUS.READY,
        timeConnected: null
    });

    const handleCharacteristicValueChanged = (event: Event) => {
        const hrEvent = event as HREvent;
        const value = hrEvent.target.value;
        const timeStamp = hrEvent.timeStamp;
        const hrData = parseHeartRate(value);

        dispatch({ type: "displayHR", payload: hrData.heartRate });
        setHRGraphData(prevState => [...prevState, { 'hr': hrData.heartRate }]);
        console.log('Heart Rate:', hrData.heartRate);
        console.log('RR intervals:', hrData.rrIntervals);
    };

    const handleServerDisconnect = () => {
        dispatch({ type: "displayStatus", payload: CONNECTION_STATUS.DISCONNECTED });
        bluetoothDevice.current?.gatt?.disconnect();
        dispatch({ type: "displayStatus", payload: CONNECTION_STATUS.DISCONNECTED });
    };

    const handleStartExercise = () => {
        dispatch({ type: "exerciseStatus", payload: EXERCISE_STATUS.EXCERCISING });
    };

    const handleExerciseComplete = () => { 
        dispatch({ type: "exerciseStatus", payload: EXERCISE_STATUS.COMPLETE });
     };

    const connectBLEDevice = async () => {
        dispatch({ type: "displayStatus", payload: CONNECTION_STATUS.CONNECTING });

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

        dispatch({ type: "displayStatus", payload: CONNECTION_STATUS.CONNECTED });
        dispatch({ type: "displayTimeConnected", payload: displayCurrentTime() });
        dispatch({ type: "hrService", payload: service });
    };

    const content = {
      [EXERCISE_STATUS.READY]: 
        <GetReady 
            exerciseTitle="[Chosen Exercise Name]" 
            imgSrc="" 
            handleStart={handleStartExercise}/>,
      [EXERCISE_STATUS.EXCERCISING]:
        <Exercise 
            exerciseTitle="[Chosen Exercise Name]" 
            imgSrc=""
            handleExerciseComplete={handleExerciseComplete}/>,
      [EXERCISE_STATUS.COMPLETE]: <Summary hrData={hrGraphData}/>
    }
    return (
        <div className="flex flex-col text-center">
          <DeviceStatus 
            handleConnect={connectBLEDevice} 
            handleDisconnect={handleServerDisconnect} 
            status={state.connectonStatus} 
            timeConnected={state.timeConnected}
            heartService={state.hrService}
            />

          {content[state.exerciseStatus]}
        </div>
    )

}