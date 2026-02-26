import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sections } from '../data/sections';
import { useGame } from '../components/GameProvider';
import { currentSectionId, isGameCompleted, sectionSolved, unlockedSectionIds } from '../utils/gameState';

function TaskRow({ icon, title, subtitle, status, buttonText, onClick, disabled }) {
  return (
    <div className="taskCard" style={{ opacity: disabled ? 0.55 : 1 }}>
      <div className="taskLeft">
        <div className="taskIcon">{icon}</div>
        <div style={{ minWidth: 0 }}>
          <div className="taskTitle">{title}</div>
          <div className="taskSub">{subtitle}</div>
        </div>
      </div>
      <button className="btn" onClick={onClick} disabled={disabled}>
        {buttonText || status}
      </button>
    </div>
  );
}

export default function OrdersPage() {
  const { state } = useGame();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const requested = Number(search.get('section')) || null;
  const unlocked = new Set(unlockedSectionIds(state));
  const sectionId = requested && unlocked.has(requested) ? requested : currentSectionId(state);
  const section = sections.find((s) => s.id === sectionId);
  const p = state.progress[sectionId];

  const totalInSection = 1 + section.orders.length;
  const doneInSection = (p.testPassed ? 1 : 0) + p.ordersSolved.filter(Boolean).length;
  const percent = Math.round((doneInSection / totalInSection) * 100);

  const showEnding = isGameCompleted(state);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div className="h1">Список заказов</div>
          <div className="muted">{section.title} · {section.subtitle}</div>
        </div>
        <div className="pill">Штраф&nbsp; <b>{state.profile.penalty}</b></div>
      </div>

      <div className="panelHeader" style={{ marginTop: 14 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
          <div className="muted" style={{ marginTop: 6 }}>{section.subtitle}</div>
          <div className="progressRow">
            <div className="progressBar">
              <div className="progressFill" style={{ width: `${percent}%` }} />
            </div>
            <div className="muted">Готово: {doneInSection}/{totalInSection}</div>
          </div>
        </div>
        <div className="pill">Уровень {sectionId}</div>
      </div>

      <div className="list">
        <TaskRow
          icon="📘"
          title={section.test.title}
          subtitle="Тестовое задание"
          status={p.testPassed ? 'Готово' : 'Открыто'}
          buttonText={p.testPassed ? 'Готово' : 'Открыто'}
          onClick={() => navigate(`/test/${sectionId}`)}
          disabled={false}
        />

        {section.orders.map((o, idx) => {
          const solved = p.ordersSolved[idx];
          const locked = !p.testPassed;
          return (
            <TaskRow
              key={o.id}
              icon="✅"
              title={o.title}
              subtitle="Заказ от клиента"
              status={solved ? 'Готово' : locked ? 'Закрыто' : 'Открыто'}
              buttonText={solved ? 'Готово' : locked ? 'Закрыто' : 'Открыто'}
              onClick={() => navigate(`/order/${sectionId}/${idx}`)}
              disabled={locked}
            />
          );
        })}
      </div>

      {sectionSolved(state, sectionId) && sectionId < 4 && (
        <div className="toast ok">
          Раздел закрыт. На главной автоматически откроется следующий блок.
        </div>
      )}

      {showEnding && (
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn primary" onClick={() => navigate('/ending')}>Завершить игру</button>
        </div>
      )}
    </div>
  );
}
