import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type AnalyzedData = {
  domain: string;
  visitCount: number;
  visitPercent: number;
  timeMsCount: number;
  timePercent: number;
};

interface Props {
  userId: string;
}

const periods: ("7days" | "30days" | "90days")[] = ["7days", "30days", "90days"];

const Analysis1: React.FC<Props> = ({ userId }) => {
  const [dataByPeriod, setDataByPeriod] = useState<Record<string, AnalyzedData[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const results: Record<string, AnalyzedData[]> = {};
      for (const period of periods) {
        const res = await fetch(`http://localhost:3000/api/summary/${userId}/${period}`);
        const json = await res.json();
        results[period] = json;
      }
      setDataByPeriod(results);
    };
    fetchData();
  }, [userId]);

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎯 사이트별 방문 비율 분석 (최근 n일)</h2>

      <div className="grid md:grid-cols-3 gap-10">
        {periods.map((period) => {
          const entries = dataByPeriod[period] || [];

          if (entries.length === 0) {
            return (
              <div key={period} className="text-center text-gray-500">
                <p>{period} 데이터 없음</p>
              </div>
            );
          }

          const labels = entries.map(e => e.domain);
          const values = entries.map(e => e.visitPercent); // visitCount 대신 비율로 표시

          const chartData = {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  '#4F46E5', '#60A5FA', '#A78BFA', '#F87171', '#FBBF24', '#34D399',
                  '#818CF8', '#F472B6', '#2DD4BF', '#FCD34D'
                ],
              }
            ]
          };

          const titleMap = {
            '7days': '최근 7일',
            '30days': '최근 30일',
            '90days': '최근 90일',
          };

          return (
            <div key={period} className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">{titleMap[period]}</h3>
              <div className="w-64 h-64">
                <Pie data={chartData} options={{
                  plugins: {
                    legend: { position: 'bottom' },
                    title: { display: false }
                  }
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analysis1;
