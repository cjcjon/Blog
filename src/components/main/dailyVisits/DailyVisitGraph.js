import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DailyVisitGraph({ data }) {
  return (
    <ResponsiveContainer width="90%" minHeight="180px">
      <LineChart
        data={data}
        margin={{ top: 8, bottom: 8, left: -12, right: 4 }}
      >
        <XAxis dataKey="day" interval="preserveStart" />
        <YAxis
          allowDecimals={false}
          domain={[() => 0, (dataMax) => Math.ceil(dataMax * 1.5)]}
        />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#007bff" name="방문자" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default React.memo(DailyVisitGraph);
