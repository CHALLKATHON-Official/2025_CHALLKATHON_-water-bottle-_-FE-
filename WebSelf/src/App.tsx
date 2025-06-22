import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './../pages/HomePage';
import AnalysisPage1 from './../pages/AnalysisPage1';
import AnalysisPage2 from './../pages/AnalysisPage2';
import AnalysisPage3 from './../pages/AnalysisPage3';
import NotFoundPage from './../pages/NotFoundPage';
import HomeLayout from './../layouts/HomeLayout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout이 필요한 페이지들 */}
        <Route element={<HomeLayout children={undefined} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis1" element={<AnalysisPage1 />} />
          <Route path="/analysis2" element={<AnalysisPage2 />} />
          <Route path="/analysis3" element={<AnalysisPage3 />} />
        </Route>

        {/* Layout이 없는 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
