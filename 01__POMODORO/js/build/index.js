/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
document.addEventListener("DOMContentLoaded", function () {
  const SECOND_IN_MILLISECONDS = 1000;
  const PomodoroTimer = {
    settings: {
      minutesLimit: 15,
      secondsLimit: 0
    },
    init: function () {
      document.addEventListener('click', this.toggleButton);
      this.countdownStart();
    },
    toggleButton: function () {
      const btn = document.getElementById('start');
      // Type guard. Check if null or undefined. Abort if so.
      if (!btn) {
        return;
      }

      // Typecast as specific HTML element versus specifying the type.
      const btnEl = btn;
      let btnText = btnEl.innerText.toLowerCase();
      btnEl.innerText = 'start' === btnText ? 'stop' : 'start';
    },
    countdownStart: function () {
      let currentMin = this.settings.minutesLimit;
      let currentSec = this.settings.secondsLimit;
      function timerCallback() {
        const mins = document.getElementById('minutes');
        const secs = document.getElementById('seconds');

        // Type guard and current time check.
        if (!secs || !mins || !currentMin && !currentSec) {
          clearInterval(timer);
          return;
        }
        const minsEl = mins;
        const secsEl = secs;

        // Decrement.
        currentSec = 0 === currentSec ? 59 : --currentSec;
        if (59 === currentSec) {
          currentMin = 0 === currentMin ? 59 : --currentMin;
        }

        // Render updated values.
        secsEl.value = currentSec.toString().padStart(2, '0');
        minsEl.value = currentMin.toString().padStart(2, '0');
        console.log(`${currentMin.toString().padStart(2, '0')}:${currentSec.toString().padStart(2, '0')}`);
      }
      const timer = setInterval(timerCallback.bind(this), SECOND_IN_MILLISECONDS);
    }
  };
  PomodoroTimer.init();
});
/******/ })()
;
//# sourceMappingURL=index.js.map