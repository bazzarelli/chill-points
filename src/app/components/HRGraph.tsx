
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from 'recharts';

type HRGraphProps = {
    data: { hr: number }[];
}

export default function HRGraph({ data }: HRGraphProps) {

    return (
        <div className="mx-auto mt-10 text-center">
            <ResponsiveContainer width="90%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey='time' 
                        tickLine={false} 
                        style={{ fontFamily: 'Arial', fontSize: '0.5rem' }} 
                        stroke="#A3D5FF" 
                    />
                    <YAxis style={{ fontFamily: 'Arial', fontSize: '0.8rem' }} label={{ fontFamily: 'Arial', value: 'bpm', offset: 13, position: 'insideBottomLeft', fill: '#A3D5FF' }} stroke="#A3D5FF" />
                    <Area type="monotone" dataKey="hr" stroke="#A3D5FF" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )

}