function GameClock(speed) {
    this.t = 0;
    this.gameClockID;

    this.harvestTimeout = function(time, startTime) {
        if (t >= startTime + time) {
            console.log('prošlo je ' + time + ' sekundi');
        }
    }

    gameClockID = setInterval(function() {
        t++;

        this.harvestTimeout(10, this.t);

    }, speed);
}

GameClock(1000);

// function harvestTimeout(time) {
//     let startTime = t;
//     harvestID = setInterval (function() {
//         if (t >= startTime + time) {
//             console.log('prošlo je ' + time + ' sekundi');
//             clearInterval(harvestID);
//         }
//     }, 200);
// }

// harvestTimeout(10);