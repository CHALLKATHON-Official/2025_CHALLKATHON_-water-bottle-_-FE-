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

const PerDaysPieChart: React.FC<Props> = ({ userId }) => {
  const [dataByPeriod, setDataByPeriod] = useState<Record<string, AnalyzedData[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      const results: Record<string, AnalyzedData[]> = {};
      for (const period of periods) {
        const res = await fetch(`https://webself-be.onrender.com/api/summary/${userId}/${period}`);
        const json = await res.json();
        console.log(`🧪 ${period} 데이터`, json); // ← 이거 추가!
        results[period] = json.map((d: any) => ({
          ...d,
          visitPercent: d.visitPercent ?? 0,
          visitCount: d.visitCount ?? 0,
        }));
      }
      setDataByPeriod(results);
    };
    fetchData();
  }, [userId]);


  return (
    <div className="px-6 py-16 w-[1000px] h-[600px] mx-auto mx-auto bg-gradient-to-br from-blue-100 to-white duration-500 hover:scale-[1.01] hover:shadow-xl rounded-2xl shadow-lg">
      <h2 className="text-xl text-center font-bold text-blue-800 drop-shadow-lg mb-10">
        사이트별 방문 비율 분석
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-3">
        {periods.map((period) => {
          const entries = dataByPeriod[period] || [];

          if (entries.length === 0) {
            return (
              <div key={period} className="text-center text-gray-700">
                <p>{period} 데이터 없음</p>
              </div>
            );
          }

          const labels = entries.map(e => e.domain);
          const values = entries.map(e => e.visitPercent);
          console.log('📊', period, '퍼센트값:', values);

          const chartData = {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  '#A5D8FF', '#B2F2BB', '#FFD6A5', '#FFC9C9', '#D0BFFF',
                  '#FFE066', '#C5F6FA', '#F3D9FA', '#FABADA', '#B2F0E5'
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
            <div key={period} className="flex flex-col items-center">
              <h3 className="text-lg text-grey-800 mb-4">{titleMap[period]}</h3>
              <div className="w-80 h-80">
                <Pie
                  data={chartData}
                  options={{
                    plugins: {
                      legend: { position: 'bottom' },
                      title: { display: false },
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerDaysPieChart;
