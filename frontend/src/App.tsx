import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import GridMapPage from './pages/GridMapPage';
import SolarNodes from './pages/SolarNodes';
import Batteries from './pages/Batteries';
import Events from './pages/Events';
import Simulation from './pages/Simulation';
import { GridProvider } from './context/GridContext';

function App() {
  return (
    <GridProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<GridMapPage />} />
            <Route path="nodes" element={<SolarNodes />} />
            <Route path="batteries" element={<Batteries />} />
            <Route path="events" element={<Events />} />
            <Route path="simulation" element={<Simulation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GridProvider>
  );
}

export default App;
