import { addMinutes, setMilliseconds, intervalToDuration, addSeconds, differenceInSeconds } from 'date-fns';

document.addEventListener( 'DOMContentLoaded', function () {
	const SECOND_IN_MILLISECONDS: number = 1000;

	const PomodoroTimer = {
		settings: {
			minutesLimit: 15,
			secondsLimit: 0,
			timer: null,
		},
		init(): void {
			const btn = document.getElementById( 'start' );
			const mins = document.getElementById( 'minutes' );
			const secs = document.getElementById( 'seconds' );

			// Type guard. Check if null or undefined. Abort if so.
			if ( ! btn || ! mins || ! secs ) {
				return;
			}
			const btnEl = btn as HTMLButtonElement;
			const minsEl = mins as HTMLInputElement;
			const secsEl = secs as HTMLInputElement;

			btnEl.addEventListener(
				'click',
				this.toggleButton.bind( {
					countdownStart: this.countdownStart.bind( this ),
					btnEl,
					minsEl,
					secsEl,
					settings: this.settings,
				} )
			);
			minsEl.addEventListener( 'input', this.updateMins.bind( this ) );
			secsEl.addEventListener( 'input', this.updateSecs.bind( this ) );

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
		updateMins( e ): void {
			const next: HTMLInputElement = e.target;
			this.settings.minutesLimit = parseInt( next.value );
			console.log( next.value );
		},
		updateSecs( e ): void {
			const next: HTMLInputElement = e.target;
			this.settings.secondsLimit = parseInt( next.value );
		},
		toggleButton(): void {
			let btnText: string | undefined =
				this.btnEl.innerText.toLowerCase();

			if ( 'start' === btnText ) {
				this.countdownStart();
				this.btnEl.innerText = 'stop';
			} else {
				// Stop countdown and reset values.
				clearInterval( this.settings.timer );
				this.btnEl.innerText = 'start';
				this.minsEl.value = this.settings.minutesLimit
					.toString()
					.padStart( 2, '0' );
				this.secsEl.value = this.settings.secondsLimit
					.toString()
					.padStart( 2, '0' );
			}
		},
		countdownStart: function (): void {

			
			let currentTime = new Date();
			currentTime = setMilliseconds( currentTime, 0 );
			let endTime = addMinutes(
				currentTime,
				this.settings.minutesLimit
			);
			endTime = addSeconds(
				endTime,
				this.settings.secondsLimit
			);

			const remainder = differenceInSeconds(endTime, currentTime);
			console.log(remainder);

			const circle = document.getElementById('circle');
			// Type guard.
			if ( ! circle ) {
				return;
			}
			const circleEl = circle as HTMLOrSVGElement;
			circle.style.strokeDashoffset = '1596';
			circle.style.animation = 'stroke ' + String(remainder) + 's linear forwards';
			/* These properties need to be set via JS on click */
			/* stroke-dashoffset: 1596; */
			/* animation: stroke 10s ease-out forwards; */
			

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
				currentTime = setMilliseconds( currentTime, 0 );

				let remainingTime = intervalToDuration( {
					start: currentTime,
					end: endTime,
				} );

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
		editTimer: function () {
			const mins = document.getElementById( 'minutes' );
			const secs = document.getElementById( 'seconds' );

			// Type guard and current time check.
			if ( ! secs || ! mins ) {
				return;
			}
			const minsEl = mins as HTMLInputElement;
			const secsEl = secs as HTMLInputElement;

			minsEl.removeAttribute( 'disabled' );
			secsEl.removeAttribute( 'disabled' );
		},
	};

	PomodoroTimer.init();
} );
