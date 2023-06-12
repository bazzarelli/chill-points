'use client';

import { useEffect, useState } from "react";

type DeviceDescProps = {
  service: BluetoothRemoteGATTService | undefined,
  name: string | undefined,
  id: string | undefined
}

function DeviceDesc({ service, name, id }: DeviceDescProps) {
  const [mfName, setMfName] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [hardwareRev, setHardwareRev] = useState('');
  const [firmwareRev, setFirmwareRev] = useState('');
  const [softwareRev, setSoftwareRev] = useState('');

  async function getDescription() {
    if (!service) return;

    const decoder = new TextDecoder("utf-8");
    const characteristics = await service.getCharacteristics();
    characteristics.forEach(async characteristic => {
      switch (characteristic.uuid) {
        case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
          const mfName = await characteristic.readValue();
          setMfName(decoder.decode(mfName));
          break;
        
        case BluetoothUUID.getCharacteristic('model_number_string'):
          setModelNo(decoder.decode(await characteristic.readValue()));
          break;

        case BluetoothUUID.getCharacteristic('hardware_revision_string'):
          setHardwareRev(decoder.decode(await characteristic.readValue()));
          break;

        case BluetoothUUID.getCharacteristic('firmware_revision_string'):
          setFirmwareRev(decoder.decode(await characteristic.readValue()));
          break;

        case BluetoothUUID.getCharacteristic('software_revision_string'):
          setSoftwareRev(decoder.decode(await characteristic.readValue()));
          break;
      }
    });
  }

  useEffect(() => {
    getDescription();
  }, []);

  const content = service?.device.gatt?.connected ? 
    (
      <div className="DeviceDesc-content">
        <div><b>Name:</b> {name}</div>
        <div><b>ID:</b> {id}</div>
        <div><b>Manufacturer&apos;s Name:</b> {mfName}</div>
        <div><b>Model Number:</b> {modelNo}</div>
        <div><b>Hardware Revision:</b> {hardwareRev}</div>
        <div><b>Firmware Revision:</b> {firmwareRev}</div>
        <div><b>Software Revision:</b> {softwareRev}</div>
      </div>
    ) :
    (<div className="DeviceDesc-no-service">No Service</div>);

  return (
    <div className="DeviceDesc">
      <div className="DeviceDesc-title"><h2>Connected Device Info</h2></div>
      {content}
    </div>
  )
}

export default DeviceDesc;
