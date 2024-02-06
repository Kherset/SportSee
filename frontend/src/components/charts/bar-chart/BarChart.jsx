import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ReactComponent as BlackCircle } from "./bar-chart-images/point-noir.svg";
import { ReactComponent as RedCircle } from "./bar-chart-images/point-rouge.svg";
import "./bar-chart.css";
import "../../style.css";

const BarChartComponent = ({ activity, minWeight, maxWeight, error }) => {
  const ticks = [];
  for (let i = minWeight - 1; i <= maxWeight + 1; i++) {
    ticks.push(i);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value} kg`}</p>
          <p>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = () => {
    return (
      <ul className="custom-legend">
        <li className="activity-legend">Activité quotidienne</li>
        <div className="weight-calories-container">
          <li className="weight-legend">
            <BlackCircle className="dot-legend" /> Poids (kg)
          </li>
          <li className="calories-legend">
            <RedCircle className="dot-legend" /> Calories brûlées (kCal)
          </li>
        </div>
      </ul>
    );
  };

  if (error) {
    return (
      <div className="analytics-element barChart-component-container">
        <div className="error-container">
          <h2 className="error-message">Impossible de charger les données.</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="analytics-element barChart-component-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activity}
            margin={{ top: 80, right: 30, left: 20, bottom: 15 }}
          >
            <YAxis
              dataKey="kilogram"
              domain={[minWeight - 1, maxWeight + 1]}
              yAxisId="kilogram"
              orientation="right"
              ticks={ticks}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text x={x + 40} y={y} fill="#9B9EAC">
                  {payload.value}
                </text>
              )}
              axisLine={false}
            />
            <YAxis yAxisId="calories" hide={true} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text x={x} y={y + 30} fill="#9B9EAC">
                  {payload.value}
                </text>
              )}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            <CartesianGrid vertical={false} strokeDasharray=" 3 3" />

            <Bar
              type="monotone"
              dataKey="kilogram"
              radius={[20, 20, 0, 0]}
              yAxisId="kilogram"
              barSize={10}
            ></Bar>

            <Bar
              type="monotone"
              dataKey="calories"
              stroke="#FF0000"
              fill="#FF0000"
              radius={[20, 20, 0, 0]}
              yAxisId="calories"
              barSize={10}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default BarChartComponent;
