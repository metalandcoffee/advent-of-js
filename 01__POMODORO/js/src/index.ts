import { format } from 'date-fns';

document.addEventListener( 'DOMContentLoaded', function () {
	const SECOND_IN_MILLISECONDS: number = 1000;

	const PomodoroTimer = {
		settings: {
			minutesLimit: 1,
			secondsLimit: 0,
			timer: null,
		},
		init: function (): void {
			document.addEventListener(
				'click',
				this.toggleButton.bind( this )
			);
		},
		toggleButton: function (): void {
			const btn = document.getElementById( 'start' );
			// Type guard. Check if null or undefined. Abort if so.
			if ( ! btn ) {
				return;
			}

			// Typecast as specific HTML element versus specifying the type.
			const btnEl = btn as HTMLButtonElement;
			let btnText: string | undefined = btnEl.innerText.toLowerCase();

			if ( 'start' === btnText ) {
				this.countdownStart();
				btnEl.innerText = 'stop';
			} else {
				// Stop countdown and reset values.
				clearInterval( this.settings.timer );
				btnEl.innerText = 'start';
			}
		},
		countdownStart: function (): void {
			console.log( format( new Date(), 'hh:mm:ss' ) );
			let currentMin = this.settings.minutesLimit;
			let currentSec = this.settings.secondsLimit;

			function timerCallback() {
				const mins = document.getElementById( 'minutes' );
				const secs = document.getElementById( 'seconds' );

				// Type guard and current time check.
				if ( ! secs || ! mins || ( ! currentMin && ! currentSec ) ) {
					console.log( format( new Date(), 'hh:mm:ss' ) );
					clearInterval( this.settings.timer );
					return;
				}
				const minsEl = mins as HTMLInputElement;
				const secsEl = secs as HTMLInputElement;

				// Decrement.
				currentSec = 0 === currentSec ? 59 : --currentSec;
				if ( 59 === currentSec ) {
					currentMin = 0 === currentMin ? 59 : --currentMin;
				}

				// Render updated values.
				secsEl.value = currentSec.toString().padStart( 2, '0' );
				minsEl.value = currentMin.toString().padStart( 2, '0' );
				console.log(
					`${ currentMin.toString().padStart( 2, '0' ) }:${ currentSec
						.toString()
						.padStart( 2, '0' ) }`
				);
			}

			this.settings.timer = setInterval(
				timerCallback.bind( this ),
				SECOND_IN_MILLISECONDS
			);
		},
	};

	PomodoroTimer.init();
} );
