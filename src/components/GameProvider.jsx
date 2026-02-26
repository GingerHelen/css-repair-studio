import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadState, saveState } from '../utils/storage';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, setState] = useState(() => {
    const s = loadState();
    if (!s) return null;
    // миграция старых сохранений
    if (!s.ui) s.ui = { onboardingShown: true };
    if (typeof s.ui.onboardingShown !== 'boolean') s.ui.onboardingShown = true;
    return s;
  });

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  const api = useMemo(() => ({ state, setState }), [state]);

  return <GameContext.Provider value={api}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
