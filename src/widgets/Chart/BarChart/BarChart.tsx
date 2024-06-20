import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
      Chart as ChartJS,
      BarElement,
      CategoryScale,
      LinearScale,
      Tooltip
      // Legend,
    } from 'chart.js';
import { IReportDoughnut } from "../../../app/types/reports/IReports"; 

interface IDoughnutChartProps {
    data: IReportDoughnut[]
}

export function BarChart({data}: IDoughnutChartProps) {
    ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)
    const [dataset, setDataset] = useState<number[]>([])

    useEffect(()=> {      
      let datasetTmp: number[] = []
      for(let i=1; i<11; i++) {
        datasetTmp.push(i*10)
      }
      for(let i=0; i<data.length; i++) {
        if(data[i].percent%10!==0) {
          datasetTmp.push(data[i].percent)
        }
      }
      setDataset(datasetTmp.sort((a,b)=>a-b))
      console.log(data.map(el=>el).sort((a,b)=>a.percent-b.percent).map(el=>el.color))
    }, [])

    const dataChart = {
      // labels: [0, 10, 20, 30, 40],
        labels: data.map(el=>el).sort((a,b)=>a.percent-b.percent).map(el=>el.name),
        // datasets: dSet
        datasets: [{
          label: 'Проценты',
          data: dataset,
          backgroundColor: data.map(el=>el).sort((a,b)=>a.percent-b.percent).map(el=>el.color),
          hoverOffset: 0,
          borderWidth: 1,
          barPercentage: 1,
        }]
    };

    const options = {
      elements: {
        bar: {
          borderWidth: 11,
        }
      }
        
    };

    return (
        <Bar style={{width: '100%', height: '400px'}} options={options} data={dataChart} />
    )
}