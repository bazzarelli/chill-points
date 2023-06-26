'use client';

import { useEffect, useState } from "react";

type HeartRateProps = {
  service: BluetoothRemoteGATTService | undefined
}

interface HREvent extends Event {
  target: HREventTarget
}
interface HREventTarget extends EventTarget {
  value: DataView;
}


function HeartRate({ service }: HeartRateProps) {
  const [hr, setHr] = useState(0);

  async function handleHeartRateValueChange(event: Event) {
    const hrEvent = event as HREvent;
    setHr(hrEvent.target.value.getInt8(1));
  }

  async function setUpHRListener() {
    if (!service) return;

    const heartRateChar = await service.getCharacteristic('heart_rate_measurement');

    heartRateChar.addEventListener("characteristicvaluechanged", handleHeartRateValueChange);
    await heartRateChar.startNotifications();
  }

  useEffect(() => {
    setUpHRListener();
  }, []);

  return (
    <div className="HeartRateGraph font-bold">
      <span>Heart Rate:</span> <span className="text-rose-600"> ❤️ {hr}</span>
    </div>
  )
}

export default HeartRate;
