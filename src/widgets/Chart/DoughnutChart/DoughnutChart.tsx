import { Doughnut } from "react-chartjs-2";
import {
      Chart as ChartJS,
      ArcElement,
      Tooltip,
      // Legend,
    } from 'chart.js';
import { IReportDoughnut } from "../../../app/types/reports/IReports";

  interface IDoughnutChartProps {
      data: IReportDoughnut[]
  }

export function DoughnutChart({data}: IDoughnutChartProps) {
    ChartJS.register(ArcElement, Tooltip)
    const dataChart = {
        labels: data.map(el=>el.name),
        datasets: [{
          label: 'Проценты',
          data: data.map(el=>el.percent),
          backgroundColor: data.map(el=>el.color),
          hoverOffset: 4
        }]
    };

    return (
        <Doughnut style={{width: '100%'}} data={dataChart} />
    )
}