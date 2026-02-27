import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../components/GameProvider';
import '../styles/app.css';


export default function IntroPage() {
  const { state, setState } = useGame();
  const navigate = useNavigate();
const base = import.meta.env.BASE_URL;
  React.useEffect(() => {
    if (!state) navigate('/start', { replace: true });
    // если уже показывали — на главную
    if (state?.ui?.onboardingShown) navigate('/orders', { replace: true });
  }, [state, navigate]);

  if (!state) return null;
  if (state.ui?.onboardingShown) return null;

  function onContinue() {
    setState((prev) => ({
      ...prev,
      ui: { ...(prev.ui || {}), onboardingShown: true },
    }));
    navigate('/orders', { replace: true });
  }

  return (
    <div className="bigCenter">
      <div className="modal" style={{ width: 'min(980px, 96vw)' }}>
        <div className="modalBody">
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 className="modalTitle">Добро пожаловать в CSS Repair Studio!</h1>

              <div className="note" style={{ lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 10px' }}>
                  Я — твой старший коллега. Клиенты будут приносить «сломанные» интерфейсы, а твоя задача — исправлять CSS
                  так, чтобы текущий макет стал выглядеть <b>точно</b> как целевой.
                </p>

                <p style={{ margin: '0 0 10px' }}>
                  В каждом разделе сначала будет задание от меня: ты читаешь теорию, а затем отвечаешь на вопросы.
                               </p>

                <p style={{ margin: '0 0 10px' }}>
                  За ошибки начисляются <b>штрафные баллы</b> — они влияют на финал. Твоя цель — дойти до статуса «Старший стажёр». Много ошибок — и мы ещё не готовы взять
                  тебя в коллектив.
                </p>

                          </div>

              <div className="note" style={{ marginTop: 14 }}>Готов приступить к работе?</div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
                <button className="btn" onClick={onContinue} style={{ width: 420 }}>
                  ДА
                </button>
              </div>
            </div>

            <div style={{ width: 280, flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
              <img src={`${base}colleague.svg`} alt="Коллега" style={{ width: '100%', maxWidth: 280, height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
