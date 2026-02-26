import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sections } from '../data/sections';
import { useGame } from '../components/GameProvider';

export default function TestPage() {
  const { sectionId } = useParams();
  const sid = Number(sectionId);
  const section = sections.find((s) => s.id === sid);
  const { state, setState } = useGame();
  const navigate = useNavigate();

  const [mode, setMode] = React.useState('theory'); // theory | quiz
  const [idx, setIdx] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const progress = state.progress[sid];

  React.useEffect(() => {
    if (!section) navigate('/orders', { replace: true });
  }, [section, navigate]);

  if (!section) return null;

  const q = section.test.questions[idx];

  function addPenalty() {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, penalty: prev.profile.penalty + 1 },
    }));
  }

  function markPassed() {
    setState((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [sid]: { ...prev.progress[sid], testPassed: true },
      },
    }));
  }

  function onCheck() {
    if (selected === null) return;
    if (selected === q.correctIndex) {
      setToast({ type: 'ok', text: 'Верно. Открываю следующий вопрос…' });
      setTimeout(() => setToast(null), 900);
      setSelected(null);
      if (idx + 1 < section.test.questions.length) {
        setIdx((x) => x + 1);
      } else {
        // тест завершён
        markPassed();
        setToast({ type: 'ok', text: 'Тест пройден! Заказы раздела открыты.' });
        setTimeout(() => navigate(`/orders?section=${sid}`), 900);
      }
    } else {
      addPenalty();
      setToast({ type: 'bad', text: 'Неверно. Штраф +1. Попробуй ещё раз.' });
      setTimeout(() => setToast(null), 1200);
    }
  }

  return (
    <div>
      <div className="h1">{section.test.title}</div>
      <div className="muted">Раздел {sid}: {section.title}</div>

      {mode === 'theory' ? (
        <div className="panel" style={{ marginTop: 14 }}>
          <div className="h2">Теория</div>

          <div className="note" style={{ maxHeight: 420, overflow: 'auto', lineHeight: 1.6 }}>
            {Array.isArray(section.test.theory) ? (
              section.test.theory.map((p, i) => (
                <div key={i} style={{ marginBottom: 10 }}>{p}</div>
              ))
            ) : (
              <>
                <div className="h2" style={{ marginTop: 0 }}>{section.test.theory.title}</div>
                {section.test.theory.blocks.map((b, i) => (
                  <div key={i} style={{ marginTop: 14 }}>
                    <div style={{ fontWeight: 800, marginBottom: 6 }}>{b.subtitle}</div>
                    {b.text && <div style={{ marginBottom: 8 }}>{b.text}</div>}
                    {b.code && (
                      <pre className="codeBlock" style={{ margin: 0 }}>
                        <code>{b.code}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <button className="btn primary" onClick={() => setMode('quiz')}>Перейти к вопросам</button>
          </div>
        </div>
      ) : (
        <div className="panel" style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div className="h2" style={{ margin: 0 }}>Вопрос {idx + 1}/{section.test.questions.length}</div>
            <div className="pill">Штраф: <b>{state.profile.penalty}</b></div>
          </div>

          <div className="note" style={{ marginTop: 12 }}>{q.q}</div>

          <div className="list" style={{ marginTop: 12 }}>
            {q.options.map((opt, i) => (
              <label
                key={i}
                className={`taskCard quizOption ${selected === i ? 'isSelected' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <div className="taskLeft" style={{ alignItems: 'flex-start' }}>
                  <div className="quizRadio" aria-hidden="true">
                    <div className={`quizRadioOuter ${selected === i ? 'on' : ''}`}>
                      <div className="quizRadioInner" />
                    </div>
                  </div>
                  <div className="taskTitle" style={{ fontWeight: 600, whiteSpace: 'normal' }}>{opt}</div>
                </div>
                <input
                  type="radio"
                  name="ans"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                  style={{ display: 'none' }}
                />
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <button className="btn" onClick={() => navigate(`/orders?section=${sid}`)}>Назад</button>
            <button className="btn primary" onClick={onCheck} disabled={selected === null}>Проверить</button>
          </div>

          {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}

          {progress.testPassed && (
            <div className="toast ok">Тест уже пройден. Можно вернуться к заказам.</div>
          )}
        </div>
      )}
    </div>
  );
}
