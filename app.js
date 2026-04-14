const countElement = document.getElementById('boop-count');
const boopButton = document.getElementById('boop-button');
const deBoopButton = document.getElementById('deboop-button');
const crabStage = document.getElementById('crab-stage');
const crabStageTitle = document.getElementById('crab-stage-title');
const crabStageDescription = document.getElementById('crab-stage-description');
const countSummary = document.getElementById('count-summary');
const moodAnnouncement = document.getElementById('mood-announcement');

const storageKey = 'boop-crab-state';

let count = 0;
let lastAction = null;

const moodContent = {
  neutral: {
    title: 'Neutral crab',
    description: 'Fresh zero state, waiting for the next button press.',
  },
  excited: {
    title: 'Excited crab',
    description: 'The crab is thrilled by that boop and still very much alive.',
  },
  sad: {
    title: 'Sad crab',
    description: 'That de-boop landed hard, but the crab is hanging in there.',
  },
  dead: {
    title: 'Death crab',
    description: 'The count dropped below zero, so the skeletal scythe crab has arrived.',
  },
};

const getMood = () => {
  if (count < 0) {
    return 'dead';
  }

  if (lastAction === 'boop') {
    return 'excited';
  }

  if (lastAction === 'deboop') {
    return 'sad';
  }

  return 'neutral';
};

const persistState = () => {
  const state = {
    count,
    lastAction,
  };

  window.localStorage.setItem(storageKey, JSON.stringify(state));
};

const hydrateState = () => {
  const rawState = window.localStorage.getItem(storageKey);

  if (!rawState) {
    return;
  }

  try {
    const parsedState = JSON.parse(rawState);
    const nextCount = Number(parsedState.count);
    const nextLastAction = parsedState.lastAction;

    if (Number.isFinite(nextCount)) {
      count = nextCount;
    }

    if (nextLastAction === 'boop' || nextLastAction === 'deboop' || nextLastAction === null) {
      lastAction = nextLastAction;
    }
  } catch (error) {
    window.localStorage.removeItem(storageKey);
  }
};

const render = () => {
  const mood = getMood();
  const content = moodContent[mood];

  countElement.textContent = String(count);
  countSummary.textContent = `Current boop count: ${count}.`;
  crabStage.dataset.mood = mood;
  crabStage.setAttribute('aria-label', `${content.title}. ${content.description}`);
  crabStageTitle.textContent = content.title;
  crabStageDescription.textContent = content.description;
  moodAnnouncement.textContent = `${content.title}. ${content.description}`;
};

const updateState = (nextCount, nextAction) => {
  count = nextCount;
  lastAction = nextAction;
  persistState();
  render();
};

boopButton.addEventListener('click', () => {
  updateState(count + 1, 'boop');
});

deBoopButton.addEventListener('click', () => {
  updateState(count - 1, 'deboop');
});

hydrateState();
render();
