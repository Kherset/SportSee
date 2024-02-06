import { React } from "react";

import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import "./radial-chart.css";

const legendScore = () => {
  return <h3 className="legendScore">Score</h3>;
};

const RadialChartComponent = ({ score, error }) => {
  let newData = [{ score: score, fill: "#ff0101" }];

  if (error) {
    return (
      <div className="analytics-element radial-chart-container">
        <div className="error-container">
          <h2 className="error-message">Impossible de charger les données.</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="radial-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            startAngle={90}
            endAngle={450}
            innerRadius={60}
            outerRadius={260}
            cy="55%"
            barSize={9}
            data={newData}
          >
            <circle cx="50%" cy="55%" fill="white" r="60"></circle>
            <PolarAngleAxis
              type="number"
              fill="#ff0101"
              domain={[0, 100]}
              tick={false}
              angleAxisId={0}
              axisLineType="circle"
            />
            <RadialBar cornerRadius="10" dataKey="score" />
            <text
              fontWeight="700"
              fontSize={26}
              fill="#282D30"
              x="50%"
              y="50%"
              textAnchor="middle"
            >
              {score}%
            </text>
            <text
              fontSize="16"
              fontWeight="500"
              fill="#74798C"
              x="50%"
              y="60%"
              textAnchor="middle"
            >
              de votre
            </text>
            <text
              fontSize="16"
              fontWeight="500"
              fill="#74798C"
              x="50%"
              y="70%"
              textAnchor="middle"
            >
              objectif
            </text>
            <Legend content={legendScore} align="left" verticalAlign="top" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default RadialChartComponent;
