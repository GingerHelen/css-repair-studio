import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useGame } from './GameProvider';
import { currentSectionId, totalSolved, totalTasks } from '../utils/gameState';
import '../styles/app.css';

export default function Layout() {
  const { state } = useGame();
  const navigate = useNavigate();

  // Если профиля нет — на старт
  React.useEffect(() => {
    if (!state) navigate('/start', { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const solved = totalSolved(state);
  const total = totalTasks();
  const cur = currentSectionId(state);

  return (
    <div className="appRoot">
      <header className="topBar">
        <div className="brand">CSS Repair Studio</div>
        <button className="iconBtn" onClick={() => navigate('/profile')} aria-label="Профиль">
          <span className="iconCircle">
            <img className="iconImg" src="/icons/profile.svg" alt="" aria-hidden="true" />
          </span>
        </button>
      </header>

      <div className="main">
        <aside className="sidebar">
          <NavLink className={({ isActive }) => (isActive ? 'navItem active' : 'navItem')} to="/orders">
            <span className="navIcon" aria-hidden="true"><img className="navIconImg" src="/icons/orders.svg" alt="" /></span>
            Заказы
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'navItem active' : 'navItem')} to="/profile">
            <span className="navIcon" aria-hidden="true"><img className="navIconImg" src="/icons/profile.svg" alt="" /></span>
            Профиль
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'navItem active' : 'navItem')} to="/sections">
            <span className="navIcon" aria-hidden="true"><img className="navIconImg" src="/icons/sections.svg" alt="" /></span>
            Разделы
          </NavLink>

          <div className="sideInfo">
            <div className="sideSmall">Текущий раздел: {cur}</div>
            <div className="sideSmall">Прогресс: {solved}/{total}</div>
          </div>
        </aside>

        <section className="content">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
