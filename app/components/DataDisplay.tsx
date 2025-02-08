"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface SensorData {
  salinity: number;
  pH: number;
  turbidity: number;
  temperature: number;
  timestamp: string;
}

const DataDisplay = () => {
  const [data, setData] = useState<SensorData[] | null>(null);

  useEffect(() => {
    // const sendTestData = async () => {
    //   const response = await fetch("/api/data", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       salinity: Math.floor(Math.random() * 10),
    //       pH: Math.floor(Math.random() * 10),
    //       turbidity: Math.floor(Math.random() * 10),
    //       temperature: Math.floor(Math.random() * 10),
    //     }),
    //   });
    //   const result = await response.json();
    //   console.log(result);
    // };

    const fetchData = async () => {
      const response = await fetch("/api/data?limit=10");
      const result: SensorData[] = await response.json();
      console.log("Fetched data:", result); // Log the fetched data
      setData(result);
      console.log("Data state after set:", result); // Log the data state
    };
    // sendTestData().then(() => {
    fetchData();
    // });
  }, []);

  const getChartData = function (whatdata: keyof SensorData, label: string) {
    return {
      labels: data ? data.map((d) => d.timestamp) : [],
      datasets: [
        {
          label: label,
          data: data ? data.map((d) => d[whatdata]) : [],
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const salinityChartData = getChartData("salinity", "Salinity");
  const pHChartData = getChartData("pH", "pH");
  const turbidityChartData = getChartData("turbidity", "Turbidity");
  const temperatureChartData = getChartData("temperature", "Temperature");

  return (
    <div>
      {data ? (
        <div>
          <h2>Received Data</h2>
          <div className="grid grid-flow-col grid-cols-4 gap-4">
            <div>
              <Line className="w-1/4" data={salinityChartData} />
            </div>
            <div>
              <Line className="w-1/4" data={pHChartData} />
            </div>
            <div>
              <Line className="w-1/4" data={turbidityChartData} />
            </div>
            <div>
              <Line className="w-1/4" data={temperatureChartData} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DataDisplay;
