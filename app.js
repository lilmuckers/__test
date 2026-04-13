const countElement = document.getElementById('boop-count');
const boopButton = document.getElementById('boop-button');
const deBoopButton = document.getElementById('deboop-button');
const crabStage = document.getElementById('crab-stage');
const crabStageTitle = document.getElementById('crab-stage-title');
const crabStageDescription = document.getElementById('crab-stage-description');

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

const render = () => {
  const mood = getMood();
  const content = moodContent[mood];

  countElement.textContent = String(count);
  crabStage.dataset.mood = mood;
  crabStageTitle.textContent = content.title;
  crabStageDescription.textContent = content.description;
};

boopButton.addEventListener('click', () => {
  count += 1;
  lastAction = 'boop';
  render();
});

deBoopButton.addEventListener('click', () => {
  count -= 1;
  lastAction = 'deboop';
  render();
});

render();
