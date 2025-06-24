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
  if (value === 0) return '#FFFFFF'; // 방문 수 0이면 흰색
  const ratio = value / max;
  if (ratio > 0.8) return '#B91C1C';       // 진한 빨강
  if (ratio > 0.6) return '#EF4444';       // 빨강
  if (ratio > 0.4) return '#F87171';       // 연한 빨강
  if (ratio > 0.2) return '#FCA5A5';       // 더 연한 빨강
  return '#FEE2E2';                        // 거의 흰색
};

const ClockActivityChart: React.FC<Props> = ({ userId, period }) => {
  const [hourlyData, setHourlyData] = useState<number[]>(Array(24).fill(0));

  useEffect(() => {
    fetch(`http://localhost:3000/api/hourly-activity/${userId}/${period}`)
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
        data: Array(24).fill(1), // 모든 바 크기를 동일하게
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
    <div className="bg-white p-6 rounded-xl shadow-md mt-10">
      <h3 className="text-lg font-semibold mb-4">
        🕒 시간대별 방문 시계 (색상 강조)
      </h3>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default ClockActivityChart;
