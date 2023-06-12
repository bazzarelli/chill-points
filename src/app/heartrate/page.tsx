'use client';

import { MouseEvent, useState } from 'react';
import Header from '../../components/Header'
import Battery from './components/Battery';
import DeviceDesc from './components/DeviceDesc';
import HeartRate from './components/HeartRate';
import RRGraph from './components/RRGraph';


const STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTING: 'disconnecting'
}

export default function Home() {
  const [hrService, setHrService] = useState<BluetoothRemoteGATTService | undefined>(undefined);
  const [batService, setBatService] = useState<BluetoothRemoteGATTService | undefined>(undefined);
  const [disService, setDisService] = useState<BluetoothRemoteGATTService | undefined>(undefined);
  const [status, setStatus] = useState(STATUS.DISCONNECTED);
  const [device, setDevice] = useState<BluetoothDevice | undefined>(undefined);

  async function handleConnectClick(evt: MouseEvent<HTMLButtonElement>) {
    setStatus(STATUS.CONNECTING);
    const newDevice = await navigator.bluetooth.requestDevice({
      // only show heart rate monitors in the selection box
      // filters: [{ services: ['heart_rate'] }], 
      optionalServices: ['device_information', 'battery_service', 'heart_rate'],
      acceptAllDevices: true,
    });

    console.log(`Connecting to ${newDevice.name} : ${newDevice.id}`);

    // handle disconnects
    newDevice.addEventListener('gattserverdisconnected', onDisconnected)
    setDevice(newDevice);

    const server = await newDevice.gatt?.connect();

    // Log available services for this device - curiosity only
    try{
      const services = await server?.getPrimaryServices();
      console.log(services);
    } catch(e) {
      console.log('could not get list of services');
      console.log(e);
    }

    // get the heart rate service
    try{
      const newHrService = await server?.getPrimaryService('heart_rate')
      setHrService(newHrService);
    } catch(e) {
      console.log('could not get hr service');
      console.log(e);
    }

    // get the battery service
    try{
      const newBatService = await server?.getPrimaryService('battery_service')
      setBatService(newBatService);
    } catch(e) {
      console.log('could not get bat service');
      console.log(e);
    }

    // get the Device Information Service
    try{
      const newDisService = await server?.getPrimaryService('device_information')
      setDisService(newDisService);
    } catch(e) {
      console.log('could not get DIS service');
      console.log(e);
    }

    setStatus(STATUS.CONNECTED);
  }

  async function handleDisconnectClick() {
    console.log('disconnecting');
    setStatus(STATUS.DISCONNECTING);
    setDisService(undefined);
    setBatService(undefined);
    setBatService(undefined);
    device?.gatt?.disconnect();
  }
  
  function onDisconnected() {
    console.log('disconnected');
    setStatus(STATUS.DISCONNECTED);
  }
  
  const buttons = {
    [STATUS.CONNECTED]: <button style={{background:'white', width:'200px', borderRadius: '5px', border:'1px solid black', margin: '8px'}}  onClick={handleDisconnectClick}>Disconnect</button>,
    [STATUS.DISCONNECTING]: <button style={{background:'white', width:'200px', borderRadius: '5px', border:'1px solid black', margin: '8px'}} disabled>Disconnecting ...</button>,
    [STATUS.CONNECTING]: <button style={{background:'white', width:'200px', borderRadius: '5px', border:'1px solid black', margin: '8px'}} disabled>Connecting ...</button>,
    [STATUS.DISCONNECTED]: <button style={{background:'white', width:'200px', borderRadius: '5px', border:'1px solid black', margin: '8px'}} onClick={handleConnectClick}>Connect</button>
  };

  const button = buttons[status];
  const deviceDescription = disService?.device.gatt?.connected ? <DeviceDesc service={disService} name={device?.name} id={device?.id} /> : <></>;
  const batteryStatus = batService?.device.gatt?.connected ? <Battery service={batService} /> : <></>;
  const heartRate = hrService?.device.gatt?.connected ? <HeartRate service={hrService} /> : <></>;
  const rrGraph = hrService?.device.gatt?.connected ? <RRGraph service={hrService} /> : <></>;

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {button}
      {heartRate}
      {deviceDescription}
      {batteryStatus}
      {rrGraph}
    </main>
  )
}
