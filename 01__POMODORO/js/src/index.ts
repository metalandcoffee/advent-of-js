import { addMinutes, setMilliseconds, intervalToDuration } from 'date-fns';

document.addEventListener( 'DOMContentLoaded', function () {
	const SECOND_IN_MILLISECONDS: number = 1000;

	const PomodoroTimer = {
		settings: {
			minutesLimit: 15,
			secondsLimit: 0,
			timer: null,
		},
		init: function (): void {
			const btn = document.getElementById( 'start' );
			// Type guard. Check if null or undefined. Abort if so.
			if ( ! btn ) {
				return;
			}
			const btnEl = btn as HTMLButtonElement;
			btnEl.addEventListener(
				'click',
				this.toggleButton.bind( {countdownStart: this.countdownStart, btnEl} )
			);


			const settingsBtn = document.querySelector( '.settings' );
			// Type guard. Check if null or undefined. Abort if so.
			if ( ! settingsBtn ) {
				return;
			}
			const settingsBtnEl = settingsBtn as HTMLButtonElement;
			settingsBtnEl.addEventListener(
				'click',
				this.editTimer.bind( this )
			);
		},
		toggleButton: function (): void {
			let btnText: string | undefined = this.btnEl.innerText.toLowerCase();

			if ( 'start' === btnText ) {
				this.countdownStart();
				this.btnEl.innerText = 'stop';
			} else {
				// Stop countdown and reset values.
				clearInterval( this.settings.timer );
				this.btnEl.innerText = 'start';
			}
		},
		countdownStart: function (): void {
			let currentTime = new Date();
			currentTime = setMilliseconds(currentTime, 0);
			const endTime = addMinutes(currentTime, this.settings.minutesLimit);

			const mins = document.getElementById( 'minutes' );
			const secs = document.getElementById( 'seconds' );

			// Type guard and current time check.
			if ( ! secs || ! mins ) {
				return;
			}
			const minsEl = mins as HTMLInputElement;
			const secsEl = secs as HTMLInputElement;
			
			function timerCallback() {
				currentTime = new Date();
				currentTime = setMilliseconds(currentTime, 0);
				
				let remainingTime = intervalToDuration({
					start: currentTime,
					end: endTime
				});
				
				const remainingMins = remainingTime.minutes as number;
				const remainingSecs = remainingTime.seconds as number; 
			
				// Render updated values.
				minsEl.value = remainingMins.toString().padStart( 2, '0' );
				secsEl.value = remainingSecs.toString().padStart( 2, '0' );

				if ( ! remainingTime.minutes && ! remainingTime.seconds ) {
					clearInterval( this.settings.timer );
				}
			}

			this.settings.timer = setInterval(
				timerCallback.bind( this ),
				SECOND_IN_MILLISECONDS
			);
		},
		editTimer: function() {
			console.log('editTimer');
			const mins = document.getElementById( 'minutes' );
			const secs = document.getElementById( 'seconds' );

			// Type guard and current time check.
			if ( ! secs || ! mins ) {
				return;
			}
			const minsEl = mins as HTMLInputElement;
			const secsEl = secs as HTMLInputElement;

			minsEl.removeAttribute('disabled');
			secsEl.removeAttribute('disabled');
		}
	};

	PomodoroTimer.init();
} );
