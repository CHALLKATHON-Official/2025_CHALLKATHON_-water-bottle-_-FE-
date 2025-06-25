import TopButton from '../components/TopButton';
import GlobalCategoryPieChart from '../components/Analysis/GlobalCategoryPieChart'; // 추가
import GlobalUsagePieChart from '../components/Analysis/GlobalUsagePieChart';
import GlobalTop8BubbleChart from '../components/Analysis/GlobalTop8BubbleChart';
import GlobalIntro from './../components/GlobalIntro';
import GlobalSearchIntro from '../components/GlobalSearchIntro';


const GlobalPage = () => {
  return (
    <div className="relative">
      <GlobalIntro />
      <TopButton />
      {/* 인트로 영역 */}
      <section className="min-h-screen h-auto pt-[30vh] px-8 py-5">
        <GlobalSearchIntro />
        {/* top site bubble 그래프 */}
        <div className="mt-100">
          <GlobalTop8BubbleChart />
        </div>
        {/* 전체 사이트 원 그래프 */}
        <div className="mt-100">
          <GlobalUsagePieChart />
        </div>
        {/* 유형별 원 그래프 */}
        <div className="mt-100">
          <GlobalCategoryPieChart />
        </div>
      </section>
    </div>
  );
};

export default GlobalPage;
