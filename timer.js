let gameClockID = -1;

function GameClock(speed) {

    if (gameClockID > 0) {
        clearTImeout(gameClockID);
    }

    gameClockID = setInterval(function() {

        if (plotArray) {
            for (let singlePlot of plotArray) {

                let plotIndex = plot.indexOf(singlePlot);

                // Watered, begin the drying timer
                if (singlePlot.watered) {
                    if (gameTime >= singlePlot.wateredTimeStamp + 6*25) {
                        singlePlot.timeoutWet(plotIndex);
                    }
                }

                // Dry, begin the decay timer
                if (!singlePlot.watered) {
                    if (gameTime >= singlePlot.dryTimeStamp + 15) {
                        singlePlot.delete(plotIndex);
                        removeFromArray(singlePlot, plotArray)
                    }
                }

                // New, begin harvestable timer
                if (!singlePlot.readyToHarvest) {
                    if (gameTime >= singlePlot.plantedTimeStamp + singlePlot.growth*25) {
                        singlePlot.timeoutHarvestable(plotIndex);
                    }
                }

            }
        }

        gameTime++;

    }, speed);
}

GameClock(1000);

