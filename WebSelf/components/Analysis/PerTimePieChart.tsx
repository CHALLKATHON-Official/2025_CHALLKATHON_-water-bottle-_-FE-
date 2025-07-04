import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale);

interface Props {
  userId: string;
  period: '7days' | '30days' | '90days';
}

const getColor = (value: number, max: number): string => {
  if (value === 0) return '#FFFFFF'; // 방문량 0이면 흰색

  const ratio = value / max;
  if (ratio > 0.8) return '#990000'; // 가장 진한 빨강
  if (ratio > 0.6) return '#cc0000';
  if (ratio > 0.4) return '#e34c4c';
  if (ratio > 0.2) return '#f28f8f';
  return '#fde0e0'; // 가장 연한 빨강
};


const PerTimePieChart: React.FC<Props> = ({ userId, period }) => {
  const [hourlyData, setHourlyData] = useState<number[]>(Array(24).fill(0));

  useEffect(() => {
    fetch(`https://webself-be.onrender.com/api/hourly-activity/${userId}/${period}`)
      .then(res => res.json())
      .then(data => {
        const visitCounts = Array(24).fill(0);
        data.forEach((item: any) => {
          visitCounts[Number(item.hour)] = Number(item.totalVisitCount);
        });
        setHourlyData(visitCounts);
      })
      .catch(err => console.error('❌ 시계형 차트 오류:', err));
  }, [userId, period]);

  const maxCount = Math.max(...hourlyData);
  const labels = Array.from({ length: 24 }, (_, i) => `${i}시`);

  const chartData = {
    labels,
    datasets: [
      {
        label: '방문량',
        data: Array(24).fill(1),
        backgroundColor: hourlyData.map(val => getColor(val, maxCount)),
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        ticks: { display: false },
        grid: { circular: true },
        pointLabels: {
          display: true,
          font: { size: 12 },
        },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const hour = context.dataIndex;
            const value = hourlyData[hour];
            return `${hour}시 방문 수: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <div className="mt-10 mx-auto rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <h3 className="mb-6 text-xl font-bold text-blue-800 drop-shadow-lg">
          시간대별 방문 시계
        </h3>
        <PolarArea data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerTimePieChart;
