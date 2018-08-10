// Game Clock
let currentGameTime = 0;
let gameTimeID;
let timer_is_on = 0;
let clockTick;

// Output current time in YY / MM format
function getGameTime(currentTime) {
    
    let mo = Math.ceil(currentTime / 25);
    let yr = Math.ceil(mo / 12);

    let result;

    mo == 0 && yr == 0 ? result = "<p>Y1 / M1</p>" : result = "<p>Y" + yr + " / " + "M" + (mo - ((yr-1) * 12)) + "</p>";

    return result;
}

// Increment current time
function gameClock() {
    document.getElementById("game-clock").innerHTML = getGameTime(currentGameTime);
    if (timer_is_on) {
        currentGameTime++;
        gameTimeID = setTimeout(gameClock, clockTick);
    } else {
        return;
    }
}

function startClock(speed) {
    timer_is_on = 1;
    switch (speed) {
        case '1x':
            clockTick = 1000;
            break;
        case '2x':
            clockTick = 500;
            break;
        case '4x':
            clockTick = 250;
            break;
        default:
            clockTick = 1000;
    }

    // Reset timeout (set new timeout)
    if (gameTimeID) {
        clearTimeout(gameTimeID);
    }
    
    // Start clock
    gameClock();
    timer_is_on = 1;
}

function stopClock() {
    clearTimeout(gameTimeID);
    timer_is_on = 0;
}