class TimerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.timerIdCounter = 0;

    this.view.addTimerButton.addEventListener('click', () => this.addTimer());
    this.view.timersContainer.addEventListener('click', (e) => this.pauseOrStartOrRemoveTimer(e));
  }

  addTimer() {
    const duration = this.view.getInputValue();
    if (Number.isNaN(duration) || duration <= 0) {
      alert('Введите корректное значение времени!');
      return;
    }

    this.timerIdCounter += 1;
    const id = this.timerIdCounter;
    this.model.addTimer(id, duration);
    const timerElement = this.view.createTimerElement(id, duration);
    this.view.renderTimer(this.view.timersContainer, timerElement);

    const timer = this.model.getTimers().get(id);
    timer.intervalId = setInterval(() => {
      if (!timer.isPaused) {
        timer.remainingTime -= 1;
        this.view.updateTimerElement(timerElement, timer.remainingTime, timer.isPaused);

        if (timer.remainingTime < 0) {
          clearInterval(timer.intervalId);
          this.model.deleteTimer(id);
          this.view.removeTimerElement(timerElement);
        }
      }
    }, 1000);

    this.view.clearInput();
  }

  pauseOrStartOrRemoveTimer(event) {
    const button = event.target;
    const listItem = button.closest('li');
    const id = parseInt(listItem.dataset.id, 10);

    if (button.classList.contains('pause-btn')) {
      this.model.pauseOrStartTimer(id);
      const timer = this.model.getTimers().get(id);
      this.view.updateTimerElement(listItem, timer.remainingTime, timer.isPaused);
    } else if (button.classList.contains('delete-btn')) {
      this.model.deleteTimer(id);
      this.view.removeTimerElement(listItem);
    }
  }
}

export default TimerController;
