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
  } from 'chart.js';

export function LineChart() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        // Legend
    );
    const options = {
        color:"black",
        // color:"black",
        responsive: true,
        // fillStyle:"white",
        // strokeStyle:"white",
        
          
        plugins: {
            
          legend: {
            position: 'top' as const,
            
            labels: {
                font: {
                    size: 17
                }
            }
          },
          title: {
            display: true,
            // text: info.title,
            color: 'black',
            
          },
      
        },
      };
    const labels = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    const dataSet = [150000, 120000, 130000, 155000, 100000, 170000, 55000]

    const data = {
        type: "line",
        labels: labels,
        // fillStyle:"white",
        fillStyle:"black",
        // color:"white",
        datasets: [
          {
            fill: true,
            // label: info.subtitle + ' за месяц',
            data: dataSet,
            borderColor: 'rgb(103, 157, 244)',
            fontColor: 'black',
            
            borderWidth: 3,
            // defaultFontColor: 'red',
            // backgroundColor: '#5e5b31',
            pointBorderColor: 'rgb(103, 157, 244)',
            pointBackgroundColor: 'rgb(103, 157, 244)',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHitRadius: 30,
            pointBorderWidth: 3,
            pointStyle: 'rectRounded',
            
          },
        //   {
        //     label: 'Dataset 2',
        //     data: [100000, 130000, 130000, 154000, 100000, 170000, 1],
        //     borderColor: 'rgb(53, 162, 235)',
        //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //   },
        ],
      }
      ChartJS.defaults.color = "black";
      ChartJS.defaults.font.size = 16;
    return (
        <Line options={options} data={data} />
    )
}