// CategoryPieChart.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  userId: string;
  period: '7days' | '30days' | '90days';
}

const CategoryPieChart: React.FC<Props> = ({ userId, period }) => {
  const [dataMap, setDataMap] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/category-summary/${userId}/${period}`)
      .then(res => res.json())
      .then(setDataMap)
      .catch(err => console.error('❌ 유형별 분석 오류:', err));
  }, [userId, period]);

  const labels = Object.keys(dataMap);
  const values = Object.values(dataMap);

  const chartData = {
    labels,
    datasets: [
      {
        label: '사용 시간 (ms)',
        data: values,
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
          '#14B8A6', '#EC4899', '#F97316', '#6B7280'
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-10">
      <h3 className="text-lg font-semibold mb-4">
        🧠 사이트 유형별 사용 시간 비중
      </h3>
      <Pie data={chartData} />
    </div>
  );
};

export default CategoryPieChart;
