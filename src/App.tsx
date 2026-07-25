import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Shell } from '@/layouts/Shell';
import { GalleryPage } from '@/pages/GalleryPage';
import { ViewerPage } from '@/pages/ViewerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<GalleryPage />} />
          <Route path="/prototype/:id" element={<ViewerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
