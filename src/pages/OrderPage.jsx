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
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/**
 * Форматируем HTML:
 * - режем длинные data URI
 * - вставляем переносы между тегами
 */
function formatHtmlForDisplay(html) {
  if (!html) return '';

  let s = String(html);

  // обрезаем длинные data URI
  s = s.replace(
    /(src\s*=\s*["']data:[^"']{120})[^"']*(["'])/gi,
    (_, prefix, quote) => `${prefix}…${quote}`
  );

  // переносы между тегами
  s = s.replace(/></g, '>\n<');

  return s.trim();
}

function HtmlPanel({ html }) {
  const pretty = React.useMemo(() => formatHtmlForDisplay(html), [html]);

  return (
    <div className="note" style={{ marginTop: 14 }}>
      <div style={{ fontWeight: 600 }}>HTML клиента:</div>

      <div
        style={{
          marginTop: 10,
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,.16)',
          background: 'rgba(0,0,0,.22)',
          padding: 12,
          overflow: 'auto',
          maxHeight: 140,
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 12.5,
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}
        >
          {pretty}
        </pre>
      </div>

      <div className="muted" style={{ marginTop: 8 }}>
        Это HTML, к которому ты пишешь селекторы.
      </div>
    </div>
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
    if (!section || !order || !state.progress[sid]?.testPassed) {
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
      return `${selector}${order.promptCSS}`;
    }
    if (!selector || !prop || !val) return '';
    return `${selector}{${prop}:${val};}`;
  }

  function isCorrect() {
    if (order.type === 'selector') {
      return selector === order.correct.selector;
    }
    return (
      selector === order.correct.selector &&
      prop === order.correct.property &&
      val === order.correct.value
    );
  }

  function onCheck() {
    if (isSolved) return;

    if (order.type === 'selector') {
      if (!selector) return;
    } else {
      if (!selector || !prop || !val) return;
    }

    const patch = generatePatchCSS();

    setApplied(true);
    setAppliedCSS(patch);

    if (isCorrect()) {
      markSolved();
      setToast({ type: 'ok', text: 'Починка принята. Текущий макет обновлён.' });
      setTimeout(() => setToast(null), 1300);
    } else {
      addPenalty();
      setToast({ type: 'bad', text: 'Не то. Штраф +1. Попробуй другой вариант.' });
      setTimeout(() => setToast(null), 1500);
    }
  }

  const currentCSS =
    order.brokenCSS +
    (applied
      ? `
/* PATCH */
${appliedCSS}`
      : '');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div className="h1" style={{ marginBottom: 8 }}>
            {order.title}
          </div>
          <div className="muted">
            Раздел {sid} · Заказ {idx + 1}/{section.orders.length}
          </div>
        </div>
        <div className="pill">
          Штраф&nbsp; <b>{state.profile.penalty}</b>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 14 }}>
        <div className="note">{order.context}</div>

        {/* HTML клиента */}
        <HtmlPanel html={order.html} />

        <div className="grid2" style={{ marginTop: 14 }}>
          <PreviewFrame title="Целевой макет" html={order.html} css={order.targetCSS} />
          <PreviewFrame title="Текущий макет" html={order.html} css={currentCSS} />
        </div>

        <div className="note" style={{ marginTop: 14 }}>
          Фрагмент стиля клиента:
          <div
            style={{
              marginTop: 8,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: 13,
            }}
          >
            {order.type === 'selector'
              ? `${order.promptCSS}`
              : `.selector { ___: ___; }`}
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
              <Select value={prop} onChange={setProp} options={order.propertyOptions} placeholder="Свойство" />
              <Select value={val} onChange={setVal} options={order.valueOptions} placeholder="Значение" />
            </>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          <button className="btn" onClick={() => navigate(`/orders?section=${sid}`)}>
            Назад
          </button>

          <button
            className="btn primary"
            onClick={onCheck}
            disabled={isSolved || (order.type === 'selector' ? !selector : !selector || !prop || !val)}
          >
            Проверить
          </button>
        </div>

        {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}

        {isSolved && <div className="toast ok">Заказ уже закрыт.</div>}
      </div>
    </div>
  );
}