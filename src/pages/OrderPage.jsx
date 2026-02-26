import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sections } from '../data/sections';
import { useGame } from '../components/GameProvider';
import PreviewFrame from '../components/PreviewFrame';

function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      className={`select ${value ? '' : 'isPlaceholder'}`}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export default function OrderPage() {
  const { sectionId, orderIndex } = useParams();
  const sid = Number(sectionId);
  const idx = Number(orderIndex);

  const section = sections.find((s) => s.id === sid);
  const order = section?.orders[idx];

  const { state, setState } = useGame();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!section || !order || !state.progress[sid].testPassed) {
      navigate(`/orders?section=${sid}`, { replace: true });
    }
  }, [section, order, state, sid, navigate]);

  if (!section || !order) return null;

  const progress = state.progress[sid];
  const isSolved = progress.ordersSolved[idx];

  const [selector, setSelector] = React.useState(null);
  const [prop, setProp] = React.useState(null);
  const [val, setVal] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  // Патч показываем только после проверки. Если задание уже решено — показываем починку сразу.
  const [applied, setApplied] = React.useState(isSolved);
  const [appliedCSS, setAppliedCSS] = React.useState(isSolved ? order.fixCSS : '');

  React.useEffect(() => {
    if (isSolved) {
      setApplied(true);
      setAppliedCSS(order.fixCSS);
    }
  }, [isSolved, order.fixCSS]);

  function addPenalty() {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, penalty: prev.profile.penalty + 1 },
    }));
  }

  function markSolved() {
    setState((prev) => {
      const next = { ...prev.progress[sid] };
      const arr = [...next.ordersSolved];
      arr[idx] = true;
      next.ordersSolved = arr;
      return { ...prev, progress: { ...prev.progress, [sid]: next } };
    });
  }

  function generatePatchCSS() {
    if (order.type === 'selector') {
      if (!selector) return '';
      // promptCSS выглядит как `{ ... }`
      return `${selector}${order.promptCSS}`;
    }
    if (!selector || !prop || !val) return '';
    return `${selector}{${prop}:${val};}`;
  }

  function isCorrect() {
    if (order.type === 'selector') {
      return selector === order.correct.selector;
    }
    return selector === order.correct.selector && prop === order.correct.property && val === order.correct.value;
  }

  function onCheck() {
    if (isSolved) return;

    if (order.type === 'selector') {
      if (!selector) return;
    } else {
      if (!selector || !prop || !val) return;
    }

    const patch = generatePatchCSS();
    // Показываем результат выбранного варианта (даже если он неверный) — только после «Проверить»
    setApplied(true);
    setAppliedCSS(patch);

    if (isCorrect()) {
      markSolved();
      setToast({ type: 'ok', text: 'Починка принята. Текущий макет обновлён.' });
      setTimeout(() => setToast(null), 1300);
    } else {
      addPenalty();
      setToast({ type: 'bad', text: 'Не то. Штраф +1. Посмотри результат и попробуй другой вариант.' });
      setTimeout(() => setToast(null), 1500);
    }
  }

  const currentCSS = order.brokenCSS + (applied ? `
/* PATCH */
${appliedCSS}` : '');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div className="h1" style={{ marginBottom: 8 }}>{order.title}</div>
          <div className="muted">Раздел {sid} · Заказ {idx + 1}/{section.orders.length}</div>
        </div>
        <div className="pill">Штраф&nbsp; <b>{state.profile.penalty}</b></div>
      </div>

      <div className="panel" style={{ marginTop: 14 }}>
        <div className="note">{order.context}</div>

        <div className="grid2" style={{ marginTop: 14 }}>
          <PreviewFrame title="Целевой макет" html={order.html} css={order.targetCSS} />
          <PreviewFrame title="Текущий макет" html={order.html} css={currentCSS} />
        </div>

        <div className="note" style={{ marginTop: 14 }}>
          Фрагмент стиля клиента:
          <div style={{ marginTop: 8, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: 13 }}>
            {order.type === 'selector'
              ? `${order.promptCSS}`
              : `.selector { ___: ___; }`}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            Выбери правильные варианты. Изменения в текущем макете появятся только после «Проверить».
          </div>
        </div>

        <div className="formRow">
          <Select
            value={selector}
            onChange={setSelector}
            options={order.selectorOptions}
            placeholder="Селектор"
          />

          {order.type !== 'selector' && (
            <>
              <Select
                value={prop}
                onChange={setProp}
                options={order.propertyOptions}
                placeholder="Свойство"
              />
              <Select
                value={val}
                onChange={setVal}
                options={order.valueOptions}
                placeholder="Значение"
              />
            </>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          <button className="btn" onClick={() => navigate(`/orders?section=${sid}`)}>Назад</button>
          <button
            className="btn primary"
            onClick={onCheck}
            disabled={isSolved || (order.type === 'selector' ? !selector : !selector || !prop || !val)}
          >
            Проверить
          </button>
        </div>

        {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}

        {isSolved && (
          <div className="toast ok">Заказ уже закрыт. Можно вернуться к списку.</div>
        )}
      </div>
    </div>
  );
}
