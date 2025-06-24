// AnalysisHourlyActivity.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  userId: string;
  period: '7days' | '30days' | '90days';
}

const AnalysisHourlyActivity: React.FC<Props> = ({ userId, period }) => {
  const [hourlyData, setHourlyData] = useState<number[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/hourly-activity/${userId}/${period}`)
      .then(res => res.json())
      .then(data => {
        const parsed = data.map((d: any) => ({
          hour: Number(d.hour),
          totalVisitCount: Number(d.totalVisitCount),
          totalDwellTime: Number(d.totalDwellTime),
        }));

        const dataMap = Object.fromEntries(parsed.map(d => [d.hour, d.totalVisitCount]));
        const counts = Array.from({ length: 24 }, (_, i) => dataMap[i] ?? 0);

        setHourlyData(counts);
      })
      .catch(err => console.error("❌ 시간대 분석 오류:", err));
  }, [userId, period]);


  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}시`),
    datasets: [
      {
        label: '평균 방문 수',
        data: hourlyData,
        backgroundColor: '#60A5FA',
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `평균 방문 수: ${ctx.raw}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-10">
      <h3 className="text-lg font-semibold mb-4">
        ⏰ 시간대별 평균 방문량 ({period === '7days' ? '7일 기준' : period === '30days' ? '30일' : '90일'})
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AnalysisHourlyActivity;
