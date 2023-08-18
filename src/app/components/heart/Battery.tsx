'use client';

import { useEffect, useState } from "react";

type BatteryProps = {
  service: BluetoothRemoteGATTService | undefined
}

function Battery({ service }: BatteryProps) {
  const [batLevel, setBatLevel] = useState(0);

  async function getBatLevel() {
    if (!service) return;
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();
    setBatLevel(value.getUint8(0) );
  }

  useEffect(() => {
    getBatLevel(); 
  }, []);

  const content = service && service.device.gatt?.connected ? <span className="Battery-Level text-green-400">{batLevel}%</span> : <span className="Battery-No-Service">No service</span>
  return (
    <div className="Battery">
      <div className="Battery-title font-bold">Battery Charge: {content}</div>
    </div>
  )
}

export default Battery;
