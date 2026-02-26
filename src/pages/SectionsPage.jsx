import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sections } from '../data/sections';
import { useGame } from '../components/GameProvider';
import { unlockedSectionIds, sectionSolved } from '../utils/gameState';

export default function SectionsPage() {
  const { state } = useGame();
  const navigate = useNavigate();
  const unlocked = new Set(unlockedSectionIds(state));

  return (
    <div>
      <div className="h1">Разделы</div>
      <div className="muted">Здесь видны все разделы. Новый раздел открывается только после полного прохождения предыдущего.</div>

      <div className="list" style={{ marginTop: 18 }}>
        {sections.map((s) => {
          const isUnlocked = unlocked.has(s.id);
          const solved = sectionSolved(state, s.id);
          return (
            <div key={s.id} className="taskCard" style={{ opacity: isUnlocked ? 1 : 0.55 }}>
              <div className="taskLeft">
                <div className="taskIcon" aria-hidden="true">
                  <img className="navIconImg" src="/icons/sections.svg" alt="" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="taskTitle">{s.title}</div>
                  <div className="taskSub">{s.subtitle}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="pill">{solved ? 'Пройден' : isUnlocked ? 'Открыт' : 'Закрыт'}</div>
                <button
                  className="btn"
                  disabled={!isUnlocked}
                  onClick={() => navigate(`/orders?section=${s.id}`)}
                >
                  Открыть
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
