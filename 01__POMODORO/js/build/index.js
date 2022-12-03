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
      // const currentTime: Date = new Date();
      // let expirationTime = addMinutes(currentTime, this.settings.minutesLimit);
      // expirationTime = addSeconds(expirationTime, this.settings.minutesLimit);
      // console.log(format(currentTime, 'hh:mm:ss'));
      // console.log(format(expirationTime, 'hh:mm:ss'));
      let currentMin = this.settings.minutesLimit;
      let currentSec = this.settings.secondsLimit;
      function timerCallback() {
        const mins = document.getElementById('minutes');
        const secs = document.getElementById('seconds');
        // Type guard.
        if (!secs || !mins) {
          return;
        }
        const minsEl = mins;
        const secsEl = secs;
        currentSec = 0 === currentSec ? 59 : --currentSec;
        if (59 === currentSec) {
          currentSec = 0 === currentSec ? 59 : --currentSec;
        }
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