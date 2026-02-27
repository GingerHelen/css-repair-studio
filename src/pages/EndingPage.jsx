import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../components/GameProvider';
import { isGameCompleted, totalSolved, totalTasks } from '../utils/gameState';
import { clearState } from '../utils/storage';

export default function EndingPage() {
  const { state, setState } = useGame();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!state) navigate('/start', { replace: true });
    if (state && !isGameCompleted(state)) navigate('/orders', { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const penalty = state.profile.penalty;
  const threshold = 12;
  const ok = penalty <= threshold;

  function restart() {
    clearState();
    setState(null);
    navigate('/start', { replace: true });
  }

  return (
    <div className="bigCenter">
      <div className="modal" style={{ width: 'min(920px, 96vw)' }}>
        <div className="modalBody">
          <h1 className="modalTitle">Итоги</h1>

          <div className={`toast ${ok ? 'ok' : 'bad'}`} style={{ fontSize: 16 }}>
            {ok
              ? 'Поздравляю! Ты остаёшься в компании — макеты снова выглядят как надо.'
              : 'Пока не готовы взять тебя в штат: слишком много штрафов. Но ты уже близко — попробуй ещё раз.'}
          </div>

          <div className="note" style={{ marginTop: 12 }}>
            Стажёр: <b>{state.profile.name}</b><br />
            Пройдено: <b>{totalSolved(state)}/{totalTasks()}</b><br />
            Штрафные баллы: <b>{penalty}</b>           </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18, gap: 12, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('/orders')}>Вернуться в меню</button>
            <button className="btn primary" onClick={restart}>Начать заново</button>
          </div>
        </div>
      </div>
    </div>
  );
}
