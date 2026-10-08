import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SpacesPage } from './pages/SpacesPage';
import { MissionPage } from './pages/MissionPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';
import { ContactPage } from './pages/ContactPage';
/* Code-split: the manifesto ships ~34KB of body text, only needed on its page. */
const ManifestoPage = lazy(() =>
  import('./pages/ManifestoPage').then((m) => ({ default: m.ManifestoPage })),
);
/* Code-split: pdf.js is ~470KB, so only load it when the Blueprint is opened. */
const BlueprintPage = lazy(() =>
  import('./pages/BlueprintPage').then((m) => ({ default: m.BlueprintPage })),
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/mission"    element={<MissionPage />} />
          <Route path="/projects"   element={<ProjectsPage />} />
          <Route path="/spaces"     element={<SpacesPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          {/* legacy path redirect */}
          <Route path="/operation"  element={<Navigate to="/get-involved" replace />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route
            path="/manifesto"
            element={<Suspense fallback={null}><ManifestoPage /></Suspense>}
          />
          <Route
            path="/blueprint"
            element={
              <Suspense
                fallback={
                  <div className="min-h-screen flex items-center justify-center text-[9px] tracking-[0.35em] font-mono opacity-25">
                    OPENING THE BLUEPRINT
                  </div>
                }
              >
                <BlueprintPage />
              </Suspense>
            }
          />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
