import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from '@/components/layout/Navbar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const SoilDataList = lazy(() => import('@/pages/soil-data/SoilDataList'));
const SoilDataDetail = lazy(() => import('@/pages/soil-data/SoilDataDetail'));
const SoilDataCreate = lazy(() => import('@/pages/soil-data/SoilDataCreate'));
const SoilDataEdit = lazy(() => import('@/pages/soil-data/SoilDataEdit'));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Suspense 
            fallback={
              <div className="flex justify-center items-center h-[50vh]">
                <LoadingSpinner />
              </div>
            }
          >
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Soil Data Routes */}
              <Route path="/soildatas" element={<SoilDataList />} />
              <Route path="/soildatas/create" element={<SoilDataCreate />} />
              <Route path="/soildatas/:id" element={<SoilDataDetail />} />
              <Route path="/soildatas/:id/edit" element={<SoilDataEdit />} />

              {/* 404 Page */}
              <Route path="/404" element={<NotFoundPage />} />
              
              {/* Redirect unknown routes to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer can be added here */}
      </div>
    </BrowserRouter>
  );
}

export default App;