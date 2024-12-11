class TimerModel {
  constructor() {
    this.timers = new Map();
  }

  addTimer(id, duration) {
    this.timers.set(id, {
      remainingTime: duration,
      isPaused: false,
      intervalId: null,
    });
  }

  pauseOrStartTimer(id) {
    if (this.timers.has(id)) {
      const timer = this.timers.get(id);
      timer.isPaused = !timer.isPaused;
    }
  }

  deleteTimer(id) {
    if (this.timers.has(id)) {
      clearInterval(this.timers.get(id).intervalId);
      this.timers.delete(id);
    }
  }

  getTimers() {
    return this.timers;
  }
}

export default TimerModel;
