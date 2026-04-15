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

const stageContent = {
  sleeping: {
    title: 'Sleeping crab',
    description: 'Fresh zero state. The crab is snoozing until the next dramatic boop.',
  },
  perked: {
    title: 'Perked-up crab',
    description: 'A few boops in, the crab is awake and curiously pleased.',
  },
  thrilled: {
    title: 'Thrilled crab',
    description: 'The crab is glowing with momentum and leaning into the applause.',
  },
  ecstatic: {
    title: 'Ecstatic crab',
    description: 'Triple-digit boops have sent the crab into full comic-book delight.',
  },
  jumping: {
    title: 'Jumping excitement crab',
    description: 'Past one thousand boops, the crab is literally bouncing with impossible joy.',
  },
  glum: {
    title: 'Glum crab',
    description: 'The count dipped below zero and the crab is visibly taking it badly.',
  },
  decaying: {
    title: 'Decaying crab',
    description: 'The de-boops keep landing, and the crab is sliding into a rotten decline.',
  },
  dead: {
    title: 'Dead crab',
    description: 'At minus three hundred, the crab has fully expired.',
  },
  husk: {
    title: 'Empty shell crab',
    description: 'Near minus one thousand, almost nothing remains except a ruined shell.',
  },
  skeleton: {
    title: 'Skeletal scythe crab',
    description: 'Below minus one thousand, the skeletal scythe-wielding crab arrives.',
  },
};

const getStage = () => {
  if (count < -1000) {
    return 'skeleton';
  }

  if (count <= -999) {
    return 'husk';
  }

  if (count <= -300) {
    return 'dead';
  }

  if (count <= -100) {
    return 'decaying';
  }

  if (count < 0) {
    return 'glum';
  }

  if (count > 1000) {
    return 'jumping';
  }

  if (count >= 100) {
    return 'ecstatic';
  }

  if (count >= 10) {
    return 'thrilled';
  }

  if (count > 0) {
    return 'perked';
  }

  return 'sleeping';
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
  const stage = getStage();
  const content = stageContent[stage];

  countElement.textContent = String(count);
  countSummary.textContent = `Current boop count: ${count}. Visible crab stage: ${content.title}.`;
  crabStage.dataset.stage = stage;
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
