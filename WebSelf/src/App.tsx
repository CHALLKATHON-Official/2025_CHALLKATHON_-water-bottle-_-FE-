import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './../pages/HomePage';
import NotFoundPage from './../pages/NotFoundPage';
import HomeLayout from './../layouts/HomeLayout';
import ScrollTop from './../components/ScrollTop';
import GlobalPage from './../pages/GlobalPage';
import ExtensionInstallPage from './../pages/ExtensionInstallPage';

const App = () => {
  return (
    <BrowserRouter>
    <ScrollTop />
      <Routes>
        {/* Layout이 필요한 페이지들 */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/global" element={<GlobalPage />} /> 
          
        </Route>

        {/* Layout이 없는 404 페이지 */}
        <Route path="/download" element={<ExtensionInstallPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
