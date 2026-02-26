import { sections } from '../data/sections';

export function createInitialState(name) {
  const progress = {};
  for (const s of sections) {
    progress[s.id] = {
      testPassed: false,
      // 6 заказов
      ordersSolved: Array(s.orders.length).fill(false),
    };
  }

  return {
    ui: { onboardingShown: false },
    profile: {
      name,
      penalty: 0,
    },
    progress,
  };
}

export function totalSolved(state) {
  let solved = 0;
  for (const s of sections) {
    const p = state.progress[s.id];
    if (p.testPassed) solved += 1;
    solved += p.ordersSolved.filter(Boolean).length;
  }
  return solved;
}

export function totalTasks() {
  return sections.reduce((acc, s) => acc + 1 + s.orders.length, 0);
}

export function sectionSolved(state, sectionId) {
  const p = state.progress[sectionId];
  return p.testPassed && p.ordersSolved.every(Boolean);
}

export function unlockedSectionIds(state) {
  const unlocked = [];
  for (const s of sections) {
    if (s.id === 1) {
      unlocked.push(1);
      continue;
    }
    // раздел N открыт, если N-1 решён полностью
    if (sectionSolved(state, s.id - 1)) unlocked.push(s.id);
  }
  return unlocked;
}

export function currentSectionId(state) {
  // главный экран показывает первый раздел, который ещё не закрыт
  for (const s of sections) {
    if (!sectionSolved(state, s.id)) return s.id;
  }
  // все закрыты
  return sections[sections.length - 1].id;
}

export function levelNumber(state) {
  // уровень = текущий доступный раздел (1..4)
  const unlocked = unlockedSectionIds(state);
  return unlocked[unlocked.length - 1] ?? 1;
}

export function rankForLevel(level) {
  const s = sections.find((x) => x.id === level);
  return s?.rank ?? 'Стажёр';
}

export function isGameCompleted(state) {
  return sections.every((s) => sectionSolved(state, s.id));
}
