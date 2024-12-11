class TimerView {
  constructor() {
    this.timeInput = document.getElementById('time-input');
    this.addTimerButton = document.getElementById('add-timer');
    this.timersContainer = document.getElementById('timers');
  }

  getInputValue() {
    return parseInt(this.timeInput.value, 10);
  }

  clearInput() {
    this.timeInput.value = '';
  }

  createTimerElement(id, time) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', id);

    const timeDisplay = document.createElement('span');
    timeDisplay.textContent = `${time} сек`;

    const pauseButton = document.createElement('button');
    pauseButton.textContent = 'Пауза';
    pauseButton.classList.add('pause-btn');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('delete-btn');

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('timer-actions');
    actionsDiv.appendChild(pauseButton);
    actionsDiv.appendChild(deleteButton);

    listItem.appendChild(timeDisplay);
    listItem.appendChild(actionsDiv);

    return listItem;
  }

  updateTimerElement(timerElement, time, isPaused) {
    const timeDisplay = timerElement.querySelector('span');
    const pauseButton = timerElement.querySelector('.pause-btn');
    timeDisplay.textContent = `${time} сек`;
    pauseButton.textContent = isPaused ? 'Старт' : 'Пауза';
  }

  removeTimerElement(timerElement) {
    timerElement.remove();
  }

  renderTimer(container, timerElement) {
    container.appendChild(timerElement);
  }
}

export default TimerView;
