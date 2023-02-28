// Global Variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const reset_btn = document.getElementById('reset');

let seconds = 0;
let interval = null;

// Event Listeners
start_btn.addEventListener('click', start); // get start button, when clicked, run function start()
stop_btn.addEventListener('click', stop); // get start button, when clicked, run function start()
reset_btn.addEventListener('click', reset); // get start button, when clicked, run function start()


// Update the timer
function timer() {
    seconds++;

    // Format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`
}

function start() {
    if (interval) { //checks to see if its already running
        return
    }

    interval = setInterval(timer, 1000); // calls the timer function every 1000ms

    start_btn.classList.add("disabled");
    stop_btn.classList.remove("disabled");
}

function stop() {
    clearInterval(interval); // set it back to zero
    interval = null; // clears the interval

    start_btn.classList.remove("disabled");
    stop_btn.classList.add("disabled");
}

function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00'

    start_btn.classList.remove("disabled");
    stop_btn.classList.remove("disabled");

}

