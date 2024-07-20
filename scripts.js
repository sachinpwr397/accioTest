document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-timer');
    const activeTimersSection = document.getElementById('active-timers');
    const alarmSound = document.getElementById('alarm-sound');
    let timers = [];

    startButton.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

        if (totalTimeInSeconds <= 0) {
            alert('Please enter a valid time.');
            return;
        }

        const timerId = timers.length;
        timers.push(totalTimeInSeconds);

        const timerElement = document.createElement('section');
        timerElement.className = 'timer';
        timerElement.setAttribute('data-timer-id', timerId);
        timerElement.innerHTML = `
            <span class="time-display">${formatTime(totalTimeInSeconds)}</span>
            <button class="stop-timer">Delete</button>
        `;

        activeTimersSection.appendChild(timerElement);

        const intervalId = setInterval(() => {
            timers[timerId]--;
            if (timers[timerId] <= 0) {
                clearInterval(intervalId);
                timerElement.classList.add('end');
                timerElement.querySelector('.time-display').innerText = 'Timer is up!';
                alarmSound.play();
            } else {
                timerElement.querySelector('.time-display').innerText = formatTime(timers[timerId]);
            }
        }, 1000);

        timerElement.querySelector('.stop-timer').addEventListener('click', () => {
            clearInterval(intervalId);
            activeTimersSection.removeChild(timerElement);
        });
    });

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
});
