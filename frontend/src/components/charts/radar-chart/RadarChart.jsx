import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import "./radar-chart.css";

const RadarChartComponent = ({ performances, error }) => {
  if (error) {
    return (
      <div
        className="analytics-element radar-component-container"
        style={{ backgroundColor: "white" }}
      >
        <div className="error-container">
          <h2 className="error-message">Impossible de charger les données.</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="analytics-element radar-component-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="68 %" data={performances}>
            <PolarGrid gridType="polygon" radialLines={false} />
            <PolarAngleAxis
              dataKey="kind"
              tick={{ fontSize: 9, fill: "white" }}
              interval="auto"
            />
            <PolarRadiusAxis axisLine={false} tick={null} />
            <Radar dataKey="value" fill="#FF0101" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default RadarChartComponent;
