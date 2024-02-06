import React, { useEffect, useState } from "react";
import BarChartComponent from "../../charts/bar-chart/BarChart";
import LineComponent from "../../charts/line-chart/LineChart";
import RadarChartComponent from "../../charts/radar-chart/RadarChart";
import RadialChartComponent from "../../charts/radial-chart/RadialChart";
import "../../style.css";
import Hello from "../hello/Hello";
import NutritionalAnalysis from "../nutrional-analysis/NutritionalAnalysis";
import "./analytics.css";
import { getApiData, DatasFormatter } from "../../../datasFormatter";

const Analytics = () => {
  const userId = process.env.REACT_APP_USER_ID;
  const [firstname, setFirstname] = useState();
  const [calories, setCalories] = useState();
  const [Proteins, setProteins] = useState();
  const [fat, setFat] = useState();
  const [carbs, setCarbs] = useState();
  const [activity, setActivity] = useState();
  const [performances, setPerformances] = useState(null);
  const [sessions, setSessions] = useState();
  const [errorBarChart, setErrorBarChart] = useState(false);
  const [errorNutritionalAnalysis, setErrorNutritionalAnalysis] =
    useState(false);
  const [errorLineChart, setErrorLineChart] = useState(false);
  const [errorRadarChart, setErrorRadarChart] = useState(false);
  const [minWeight, setMinWeight] = useState(null);
  const [maxWeight, setMaxWeight] = useState(null);
  const [score, setScore] = useState();

  // component NutrionalAnalysis, radialChart & Hello
  useEffect(() => {
    getApiData("getUsersDatas", userId)
      .then((result) => {
        if (result && result.data) {
          const datasFormatter = new DatasFormatter();
          const fetchKeyData = result.data.keyData;
          const scoreFormatted = datasFormatter.formatUserDatas(result.data);
          setFirstname(result.data.userInfos.firstName);
          setCalories(fetchKeyData.calorieCount);
          setProteins(fetchKeyData.proteinCount);
          setFat(fetchKeyData.lipidCount);
          setCarbs(fetchKeyData.carbohydrateCount);
          setScore(scoreFormatted.score * 100);
        } else {
          setErrorNutritionalAnalysis(true);
        }
      })
      .catch((err) => {
        setErrorNutritionalAnalysis(true);
      });
  }, [userId]);

  // Component barChart
  useEffect(() => {
    const datasFormatter = new DatasFormatter();
    getApiData("getUsersActivity", userId)
      .then((result) => {
        if (result && result.data) {
          const activityFormatted = datasFormatter.formatActivityDatas(
            result.data.sessions
          );
          setActivity(activityFormatted.activitiesDatasFormatted);
          setMinWeight(activityFormatted.minKilos);
          setMaxWeight(activityFormatted.maxKilos);
        } else {
          setErrorBarChart(true);
        }
      })
      .catch((err) => {
        setErrorBarChart(true);
      });
  }, [userId]);

  // Component radarChart
  useEffect(() => {
    const datasFormatter = new DatasFormatter();
    getApiData("getUsersPerformances", userId)
      .then((result) => {
        if (result && result.data) {
          const activityFormatted = datasFormatter.formatPerformancesDatas(
            result.data.data
          );
          setPerformances(activityFormatted);
        } else {
          setErrorRadarChart(true);
        }
      })
      .catch((err) => {
        setErrorRadarChart(true);
      });
  }, [userId]);

  // Component lineChart
  useEffect(() => {
    const datasFormatter = new DatasFormatter();
    getApiData("getUsersAverages", userId)
      .then((result) => {
        if (result && result.data) {
          const sessionsFormatted = datasFormatter.formatSessionsDatas(
            result.data.sessions
          );
          setSessions(sessionsFormatted);
        } else {
          setErrorLineChart(true);
        }
      })
      .catch((err) => {
        setErrorLineChart(true);
      });
  }, [userId]);

  return (
    <main>
      <Hello firstname={`${firstname}`} error={errorNutritionalAnalysis} />
      <BarChartComponent
        activity={activity}
        minWeight={minWeight}
        maxWeight={maxWeight}
        error={errorBarChart}
      />
      <div className="nutritional-container">
        <NutritionalAnalysis
          image="calories.png"
          label="Calories"
          value={`${calories}kCal`}
          error={errorNutritionalAnalysis}
        />
        <NutritionalAnalysis
          image="protein.png"
          label="Protéines"
          value={`${Proteins}g`}
          error={errorNutritionalAnalysis}
        />
        <NutritionalAnalysis
          image="carbs.png"
          label="Glucides"
          value={`${carbs}g`}
          error={errorNutritionalAnalysis}
        />
        <NutritionalAnalysis
          image="fat.png"
          label="Lipides"
          value={`${fat}g`}
          error={errorNutritionalAnalysis}
        />
      </div>
      <LineComponent sessions={sessions} error={errorLineChart} />
      <RadarChartComponent
        performances={performances}
        error={errorRadarChart}
      />
      <RadialChartComponent score={score} error={errorNutritionalAnalysis} />
    </main>
  );
};

export default Analytics;
