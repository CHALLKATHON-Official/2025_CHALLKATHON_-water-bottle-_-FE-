// ActivityChartAnalysis.tsx
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  Title
);

interface Props {
  userId: string;
  period: '7days' | '30days' | '90days';
}

interface DailyData {
  date: string;
  visitCount: number;
}

const PerDayGraphChart: React.FC<Props> = ({ userId, period }) => {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);

  useEffect(() => {
    console.log("🟢 useEffect 실행됨");
    console.log("🔍 userId:", userId);
    console.log("🔍 period:", period);

    const url = `https://webself-be.onrender.com/api/activity/${userId}/${period}`;
    console.log("🧪 요청 URL:", url);

    fetch(url)
      .then(res => {
        console.log("📦 응답 상태코드:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("📊 일별 데이터:", data);
        setDailyData(data);
      })
      .catch(err => console.error('❌ 방문 통계 오류:', err));
  }, [userId, period]);




  const labels = dailyData.map(d => dayjs(d.date).format('M월 D일'));
  const values = dailyData.map(d => d.visitCount);

  const chartData = {
    labels,
    datasets: [
      {
        label: '방문 수',
        data: values,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)', // Tailwind blue-500 10%
        borderColor: '#3B82F6', // Tailwind blue-500
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#3B82F6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `방문 수: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto">
      <div className="mt-10 mx-auto rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
        <h3 className="mb-6 text-xl font-bold text-blue-800 drop-shadow-lg">
          {period === '7days' ? '최근 7일간' : period === '30days' ? '30일간' : '90일간'} 활동량 변화
        </h3>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );

};

export default PerDayGraphChart;
