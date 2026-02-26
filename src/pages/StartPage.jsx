import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../components/GameProvider';
import { createInitialState } from '../utils/gameState';
import '../styles/app.css';

export default function StartPage() {
  const { state, setState } = useGame();
  const navigate = useNavigate();
  const [name, setName] = React.useState(state?.profile?.name || '');

  React.useEffect(() => {
    // если уже есть прогресс — отправляем на нужный стартовый экран
    if (state) {
      if (state.ui && state.ui.onboardingShown === false) navigate('/intro', { replace: true });
      else navigate('/orders', { replace: true });
    }
}, [state, navigate]);

  function onSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setState(createInitialState(trimmed));
    navigate('/intro', { replace: true });
  }

  return (
    <div className="bigCenter">
      <div className="modal">
        <div className="modalBody">
          <h1 className="modalTitle">Создание профиля</h1>
          <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="miniIconCircle" aria-hidden="true">
                <img className="iconImg" src="/icons/profile.svg" alt="" />
              </div>
              <input
                className="input"
                placeholder="Введите имя стажёра"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={24}
                autoFocus
              />
            </div>
            <div className="smallHint">Прогресс сохраняется локально</div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
              <button className="btn" type="submit" style={{ width: '100%', maxWidth: 420, fontSize: 16 }}>
                НАЧАТЬ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
