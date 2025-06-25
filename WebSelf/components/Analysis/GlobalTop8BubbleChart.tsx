import React, { useEffect, useState } from 'react';

interface SiteData {
  site: string;
  count: number;
}

const colors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B', '#6366F1', '#EC4899', '#14B8A6'];

const fixedPositions = [
  { left: '20%', top: '10%' },
  { left: '55%', top: '5%' },
  { left: '15%', top: '60%' },
  { left: '60%', top: '55%' },
  { left: '35%', top: '35%' },
  { left: '75%', top: '25%' },
  { left: '10%', top: '30%' },
  { left: '45%', top: '70%' } 
];

const GlobalTop8BubbleChart = () => {
  const [sites, setSites] = useState<SiteData[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://webself-be.onrender.com/api/global-top8')
      .then(res => res.json())
      .then(data => setSites(data))
      .catch(err => console.error('❌ 글로벌 분석 오류:', err));
  }, []);

  const counts = sites.map(site => site.count).filter(c => typeof c === 'number' && !isNaN(c));
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

  return (
    <div className="relative h-[500px] w-full">
      {sites.map((site, index) => {
        const safeCount = typeof site.count === 'number' && !isNaN(site.count) ? site.count : 1;
        const radius = 60 + Math.pow(safeCount / maxCount, 1.2) * 140;

        const position = fixedPositions[index] || { left: '0%', top: '0%' };
        const domain = (() => {
          try {
            const urlObj = new URL(site.site.startsWith('http') ? site.site : `https://${site.site}`);
            return urlObj.hostname;
          } catch {
            return site.site;
          }
        })();

        return (
          <div
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{
              position: 'absolute',
              left: position.left,
              top: position.top,
              width: radius,
              height: radius,
              backgroundColor: colors[index % colors.length],
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              textAlign: 'center',
              padding: '4px',
              whiteSpace: 'nowrap',
              transition: 'transform 0.3s ease',
              transform: hoverIndex === index ? 'scale(1.1)' : 'scale(1)',
              zIndex: hoverIndex === index ? 10 : 1,
            }}
          >
            {domain}
            {hoverIndex === index && (
              <div
                style={{
                  position: 'absolute',
                  bottom: `calc(100% + 8px)`,
                  backgroundColor: 'white',
                  color: '#333',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-5px)',
                  pointerEvents: 'none',
                }}
              >
                {domain} - {safeCount.toLocaleString()}회 방문
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GlobalTop8BubbleChart;
