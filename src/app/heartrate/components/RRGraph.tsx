'use client';

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type HeartRateProps = {
  service: BluetoothRemoteGATTService | undefined
}

interface HREvent extends Event {
  target: HREventTarget
}
interface HREventTarget extends EventTarget {
  value: DataView;
}


function RRGraph({ service }: HeartRateProps) {
  const [rrData, setData] = useState<{rr:number}[]>([{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},{rr:0},]);

  async function handleHeartRateValueChange(event: Event) {
    const hrEvent = event as HREvent;
    const value = hrEvent.target.value;
    const flags = value.getUint8(0);  
    let rate16Bits = flags & 0x1;
    let index = 1;
    console.log(`rate16Bits ${rate16Bits}`);
    if (rate16Bits) {
        index += 2;
    } else {
        index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    console.log(`Contact sensor present = ${contactSensorPresent} Contact Detected = ${contactDetected}`);
    
    let energyPresent = flags & 0x8;
    console.log(`Enegy present? ${energyPresent}`);
    if (energyPresent) {
        console.log(`energy expended ${value.getUint16(index, /*littleEndian=*/true)}`);
        index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      const rrIntervals: {rr:number}[] = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push({rr: value.getUint16(index, /*littleEndian=*/true)});
      }
      setData((data) => {
        const delta = data.length + rrIntervals.length - 20;
        const offset =  (delta > 0) ? delta-1 : 0;
        return([...data.slice(offset),...rrIntervals]);
      });
    }
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
    <div className="HeartRateGraph">
      <h1>RR Intervals</h1>
      <AreaChart
          width={500}
          height={400}
          data={rrData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >   
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="colorRR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="red" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <YAxis />
        <XAxis />
        <Tooltip />
        <Area type="monotone" dataKey="rr" stroke="darkred" fillOpacity={1} fill="url(#colorRR)" />
      </AreaChart>
    </div>
  )
}

export default RRGraph;