import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { app: "Google Play Store", usage: 64.8 },
  { app: "Apple App Store", usage: 52.9 },
  { app: "Samsung Galaxy Store", usage: 24.19 },
  { app: "Amazon App Store", usage: 14.44 },
  { app: "F Droid", usage: 35.31 },
  { app: "Windows Store", usage: 2.827 },
];

const AppUsageChart = () => {
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={100} />

        <BarSeries barWidth="0.8" valueField="usage" argumentField="app" />
        <Animation />
      </Chart>
    </Paper>
  );
};

export default AppUsageChart;
