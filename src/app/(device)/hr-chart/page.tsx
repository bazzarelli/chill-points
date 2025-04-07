"use client";

import HRGraph from "@/app/components/heart/HRGraph";
import { parseHeartRate } from "@/app/utils/parseHRData";
import { DateTime } from "luxon";
import Image from "next/image";
import { useReducer, useRef } from "react";

// Define status as a const enum for better type safety
const STATUS = {
  DISCONNECTED: "DISCONNECTED",
  CONNECTED: "CONNECTED",
  CONNECTING: "CONNECTING",
} as const;

type BluetoothStatus = (typeof STATUS)[keyof typeof STATUS];

type State = {
  hrValue: number | null;
  connectionStatus: BluetoothStatus;
  timeConnected: string | null;
  hrGraphData: { hr: number }[];
};

type Action =
  | { type: "displayHR"; payload: number }
  | { type: "displayStatus"; payload: BluetoothStatus }
  | { type: "displayTimeConnected"; payload: string }
  | { type: "sendHRGraphData"; payload: { hr: number } }
  | { type: "reset" };

type HREvent = Event & {
  target: EventTarget & {
    value: DataView;
  };
};

const initialState: State = {
  hrValue: null,
  connectionStatus: STATUS.DISCONNECTED,
  timeConnected: null,
  hrGraphData: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "displayHR":
      return { ...state, hrValue: action.payload };
    case "displayStatus":
      return { ...state, connectionStatus: action.payload };
    case "displayTimeConnected":
      return {
        ...state,
        timeConnected: `Connected at ${action.payload}`,
      };
    case "sendHRGraphData":
      return {
        ...state,
        hrGraphData: [...state.hrGraphData, action.payload],
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default function Page() {
  const bluetoothDevice = useRef<BluetoothDevice | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCharacteristicValueChanged = (event: Event) => {
    const hrEvent = event as HREvent;
    const value = hrEvent.target.value;
    const hrData = parseHeartRate(value);

    dispatch({ type: "displayHR", payload: hrData.heartRate });
    dispatch({ type: "sendHRGraphData", payload: { hr: hrData.heartRate } });
  };

  const handleServerDisconnect = () => {
    if (bluetoothDevice.current?.gatt?.connected) {
      bluetoothDevice.current.gatt.disconnect();
    }
    dispatch({ type: "reset" });
  };

  const connectBLEDevice = async () => {
    try {
      dispatch({ type: "displayStatus", payload: STATUS.CONNECTING });

      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
        optionalServices: [
          "device_information",
          "battery_service",
          "heart_rate",
        ],
      });

      bluetoothDevice.current = device;
      device.addEventListener("gattserverdisconnected", handleServerDisconnect);

      const server = await device.gatt?.connect();
      if (!server) throw new Error("Failed to connect to GATT server");

      const service = await server.getPrimaryService("heart_rate");
      if (!service) throw new Error("Heart rate service not found");

      const characteristic = await service.getCharacteristic(
        "heart_rate_measurement",
      );
      if (!characteristic)
        throw new Error("Heart rate characteristic not found");

      await characteristic.startNotifications();
      characteristic.addEventListener(
        "characteristicvaluechanged",
        handleCharacteristicValueChanged,
      );

      dispatch({ type: "displayStatus", payload: STATUS.CONNECTED });
      dispatch({
        type: "displayTimeConnected",
        payload: DateTime.now().toLocaleString(DateTime.TIME_SIMPLE),
      });
    } catch (error) {
      console.error("Bluetooth connection error:", error);
      handleServerDisconnect();
    }
  };

  const getStatusColor = (status: BluetoothStatus) => {
    switch (status) {
      case STATUS.CONNECTED:
        return "text-blue-500";
      case STATUS.CONNECTING:
        return "text-yellow-500";
      default:
        return "text-slate-600";
    }
  };

  return (
    <main className="flex flex-col">
      <div className="flex md:w-1/2 md:mx-auto px-1 bg-sky-200 border border-sky-900">
        <div className="flex-1 w-1/2 items-center">
          <Image
            className={`opacity-50 inline-block ${
              state.connectionStatus === STATUS.CONNECTING
                ? "animate-pulse"
                : ""
            }`}
            src={`/icons/bluetooth_${state.connectionStatus.toLowerCase()}.svg`}
            // src="/icons/bluetooth_connected.svg"
            alt={`Bluetooth ${state.connectionStatus}`}
            width="24"
            height="24"
          />
          <span className={getStatusColor(state.connectionStatus)}>
            {state.connectionStatus}
          </span>
        </div>
        <div className="flex-1 w-1/2 text-right text-slate-600">
          {state.timeConnected}
        </div>
      </div>
      <div className="p-6 text-center md:mx-auto md:w-1/2 bg-sky-900 rounded">
        {state.connectionStatus === STATUS.DISCONNECTED && (
          <button
            className="btn btn-info md:w-1/4 mx-auto mt-5 shadow-lg"
            onClick={connectBLEDevice}
          >
            Pair Device
          </button>
        )}
        {state.connectionStatus === STATUS.CONNECTED && (
          <button
            className="btn btn-accent md:w-1/4 mx-auto mt-5 shadow-lg"
            onClick={handleServerDisconnect}
          >
            Unpair Device
          </button>
        )}
        <h1 className="text-3xl text-red-500 text-center mt-5">
          {state.connectionStatus === STATUS.CONNECTED && state.hrValue}
          {state.connectionStatus === STATUS.CONNECTED && "♥️"}
        </h1>
        <HRGraph data={state.hrGraphData} />
      </div>
    </main>
  );
}
