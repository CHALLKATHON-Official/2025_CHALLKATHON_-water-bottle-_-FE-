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

const PerCategoryPieChart: React.FC<Props> = ({ userId, period }) => {
  const [dataMap, setDataMap] = useState<Record<string, number>>({});

  useEffect(() => {
      fetch(`https://webself-be.onrender.com/api/category-summary/${userId}/${period}`)
      .then(res => res.json())
      .then(data => {
        setDataMap(data);
      })
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
          '#A5D8FF', '#B2F2BB', '#FFD6A5', '#FFC9C9', '#D0BFFF',
          '#FFE066', '#C5F6FA', '#F3D9FA', '#FABADA'
        ]
      }
    ]
  };

  return (
    <div className="mt-10 w-[700px] mx-auto rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl">
      <h3 className="text-xl font-semibold text-blue-800 drop-shadow-lg mb-4">
        사이트 유형별 사용 시간 비중
      </h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PerCategoryPieChart;
