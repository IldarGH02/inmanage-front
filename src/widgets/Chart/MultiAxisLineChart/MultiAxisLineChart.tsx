import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { IExpenseBalance, IIncomeBalance } from "../../../app/types/balance/IBalance";

  interface IMultiAxisLineChart {
      expenses: IExpenseBalance[],
      incomes: IIncomeBalance[]
  }

export function MultiAxisLineChart({expenses, incomes}: IMultiAxisLineChart) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );
    
    const labels = [...Array(32 - new Date(new Date().getFullYear(), new Date().getMonth(), 32).getDate())].map((_, i) => i+1)
    // const dataSet1 = [150000, 120000, 130000, 155000, 100000, 170000, 5500, 150000, 120000, 130000, 155000, 100000, 170000, 5500, 150000, 120000, 130000, 155000, 100000, 170000, 5500, 150000, 120000, 130000, 155000, 100000, 170000, 5500, 5500]
    const dataSet1 = labels.map(el=>{
      let incomeTmp: number = 0
      incomes.forEach(income=>{
        if(new Date(income.created_at!).getDate() === el) {
          incomeTmp += income.funds
        }
      })
      return incomeTmp
    })
    const dataSet2 = labels.map(el=>{
      let expenseTmp: number = 0
      expenses.forEach(expense=>{
        if(new Date(expense.created_at!).getDate() === el) {
          expenseTmp += expense.funds
        }
      })
      return expenseTmp
    })

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom' as const,
          labels: {
            font: {
              size: 17,
              color: 'rgb(255, 99, 132)'
            }
          }
        },
      },
      scales: {
        x: {
          color: 'red',
          display: true,
          position: 'top',
          ticks: {
            color: dataSet1.map((el, i)=>{
              if(el<dataSet2[i]) {
                return "rgb(254, 89, 57)"
              } else {
                return "rgb(55, 140, 252)"
              }
            })
          }
          
          
        },
        y: {
          type: 'linear',
          display: false,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: false,
          position: 'right',
  
          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      }
      };

    const data = {
      labels: labels,
      datasets: [
        {
          fill: true,
          label: 'Доход',
          data: dataSet1,
          borderColor: 'rgb(55, 140, 252)',
          backgroundColor: 'rgba(55, 140, 252, 0.5)',
          yAxisID: 'y1',
        },
        {
          fill: true,
          label: 'Расход',
          data: dataSet2,
          borderColor: 'rgb(254, 89, 57)',
          backgroundColor: 'rgba(254, 89, 57, 0.5)',
          yAxisID: 'y1',
        }
      ]
    }
    ChartJS.defaults.color = "black";
    ChartJS.defaults.font.size = 14.5;
    return (
      // <div className="chart-container" style={{position: 'relative', height:'210px', width: "680px"}}>
        <Line options={options as any} data={data} />
      // </div>
    )
}