import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GameProvider } from './components/GameProvider';
import Layout from './components/Layout';

import StartPage from './pages/StartPage';
import IntroPage from './pages/IntroPage';
import OrdersPage from './pages/OrdersPage';
import SectionsPage from './pages/SectionsPage';
import ProfilePage from './pages/ProfilePage';
import TestPage from './pages/TestPage';
import OrderPage from './pages/OrderPage';
import EndingPage from './pages/EndingPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <HashRouter>
        <Routes>
          <Route path="/start" element={<StartPage />} />
          <Route path="/intro" element={<IntroPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/orders" replace />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="sections" element={<SectionsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="test/:sectionId" element={<TestPage />} />
            <Route path="order/:sectionId/:orderIndex" element={<OrderPage />} />
            <Route path="ending" element={<EndingPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </GameProvider>
  </React.StrictMode>
);
