import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ data }) => {
  const [outerRadius, setOuterRadius] = useState(240);
  const [containerHeight, setContainerHeight] = useState(820);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 980) {
        setOuterRadius(170);
        setContainerHeight(470); 
      } else {
        setOuterRadius(240);
        setContainerHeight(820); 
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height={containerHeight}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
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
