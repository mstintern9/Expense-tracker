import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={800}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={240}
          fill="#8884d8"
          label
        />
        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
