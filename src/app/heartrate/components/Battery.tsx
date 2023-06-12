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

  const content = service && service.device.gatt?.connected ? <div className="Battery-Level"><b>Battery:</b> {batLevel}%</div> : <div className="Battery-No-Service">No service</div>
  return (
    <div className="Battery">
    <div className="Battery-title"><h2>Battery Status</h2></div>
      {content}
    </div>
  )
}

export default Battery;