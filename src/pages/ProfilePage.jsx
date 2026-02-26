import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../components/GameProvider';
import { clearState } from '../utils/storage';
import { levelNumber, rankForLevel, totalSolved, totalTasks } from '../utils/gameState';

export default function ProfilePage() {
  const { state, setState } = useGame();
  const navigate = useNavigate();

  const level = levelNumber(state);
  const rank = rankForLevel(level);
  const solved = totalSolved(state);
  const total = totalTasks();

  function reset() {
    clearState();
    setState(null);
    navigate('/start', { replace: true });
  }

  return (
    <div>
      <div className="h1">Карточка стажёра</div>

      <div className="panel" style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{state.profile.name}</div>
            <div className="muted" style={{ marginTop: 6 }}>Статус: {rank}</div>
          </div>
          <div className="pill" style={{ fontSize: 14 }}>Уровень {level}</div>
        </div>

        <div className="progressRow" style={{ marginTop: 18 }}>
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${Math.round((solved / total) * 100)}%` }} />
          </div>
        </div>

        <div className="muted" style={{ marginTop: 10, fontSize: 16 }}>{solved}/{total} заданий</div>

        <div className="formRow" style={{ marginTop: 14 }}>
          <div className="pill">Штраф: <b>{state.profile.penalty}</b></div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn danger" onClick={reset}>Сбросить прогресс</button>
        <div className="smallHint" style={{ marginTop: 8 }}>
          Сброс удалит пройденные задания и откроет только первый блок.
        </div>
      </div>
    </div>
  );
}
