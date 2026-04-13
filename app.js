const countElement = document.getElementById('boop-count');
const boopButton = document.getElementById('boop-button');
const deBoopButton = document.getElementById('deboop-button');

let count = 0;

const renderCount = () => {
  countElement.textContent = String(count);
};

boopButton.addEventListener('click', () => {
  count += 1;
  renderCount();
});

deBoopButton.addEventListener('click', () => {
  count -= 1;
  renderCount();
});

renderCount();
