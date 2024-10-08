'use client';

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import rmssd from '@/app/utils/rmssd';

type HeartRateProps = {
  service: BluetoothRemoteGATTService | undefined
}

interface HREvent extends Event {
  target: HREventTarget
}
interface HREventTarget extends EventTarget {
  value: DataView;
}

const MAX_NUM_DATA_POINTS = 20;
const EMPTY_DATA = [...Array(MAX_NUM_DATA_POINTS)].map(_ => { return { rr: 0 }; });

function RRGraph({ service }: HeartRateProps) {
  const [rrData, setData] = useState<{ rr: number }[]>(EMPTY_DATA);

  async function handleHeartRateValueChange(event: Event) {
    const hrEvent = event as HREvent;
    const value = hrEvent.target.value;
    const flags = value.getUint8(0);

    // the data collected from the heart monitor is just an array of bits.  We need to keep track of d
    // where the interval data starts based on what the data flags say.
    let rate16Bits = flags & 0x1;
    let index = 1;
    rate16Bits ? index += 2 : index += 1;

    let energyPresent = flags & 0x8;
    if (energyPresent) index += 2;

    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      const rrIntervals: { rr: number }[] = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push({ rr: value.getUint16(index, /*littleEndian=*/true) });
      }

      setData((data) => {
        const delta = data.length + rrIntervals.length - 20;
        const offset = (delta > 0) ? delta - 1 : 0;
          
        return ([...data.slice(offset), ...rrIntervals]);
      });

      console.log('rrData', rrData);
      if (rrData.length > 20) {
        const HRV = rmssd(rrData);
        console.log('HRV', HRV);  
      }

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
    <div className="mt-10 HeartRateGraph">
      <span className="font-bold">RR Intervals</span>
      <ResponsiveContainer width="90%" height={250}>
        <AreaChart data={rrData}>
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="colorRR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#507DBC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#507DBC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="rr" stroke="white" fillOpacity={1} fill="url(#colorRR)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RRGraph;
