import {
  Bar,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type InhaleTimes = {
  data: number[];
};

function parseInhaleTimes(inhaleTimes: number[]) {
  const parsedData = [];
  for (let i = 0; i < inhaleTimes.length; i += 2) {
    parsedData.push({
      cycle: i / 2 + 1,
      inhale: inhaleTimes[i],
      exhale: inhaleTimes[i + 1],
    });
  }
  return parsedData;
}

export default function BreathSessionGraph({ data }: InhaleTimes) {
  return (
    <div className="md:mx-auto mt-5 text-center">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          width={500}
          height={300}
          layout={"vertical"}
          data={parseInhaleTimes(data)}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            type="number"
            style={{ fontFamily: "Arial", fontSize: "0.7rem" }}
            tickLine={false}
            label={{
              fontFamily: "Arial",
              fontSize: "0.8rem",
              fill: "#A3D5FF",
              value: "seconds",
              offset: 0,
              position: "insideBottomLeft",
            }}
            stroke="#A3D5FF"
            tickFormatter={(milis: number) => (milis / 1000).toString()}
          />
          <YAxis
            style={{ fontFamily: "Arial", fontSize: "0.8rem" }}
            tickLine={false}
            axisLine={false}
            height={350}
            dataKey={"cycle"}
            type={"category"}
            interval={"preserveStartEnd"}
            padding={{ top: 10, bottom: 10 }}
            scale={"band"}
            stroke="#A3D5FF"
          />
          <Legend iconType="circle" verticalAlign="top" width={400} />
          <Bar dataKey="inhale" barSize={12} stackId="a" fill="#EA8C55" />
          <Bar dataKey="exhale" barSize={12} stackId="a" fill="#C75146" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
