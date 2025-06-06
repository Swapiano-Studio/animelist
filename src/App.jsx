import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './components/home/HomePage';
import AnimePage from './components/anime/AnimePage';
import MangaPage from './components/manga/MangaPage';
import DetailAnime from './components/anime/DetailAnime';
import DetailManga from './components/manga/DetailManga';
import PrivacyPolicy from './components/ui/PrivacyPolicy';
import TermsOfService from './components/ui/TermsOfService';
import NotFound from './components/ui/NotFound';
import DetailCharacter from './components/character/DetailCharacter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="anime" element={<AnimePage />} />
          <Route path="manga" element={<MangaPage />} />
          <Route path="anime/:id" element={<DetailAnime />} />
          <Route path="manga/:id" element={<DetailManga />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="character/:id" element={<DetailCharacter />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
