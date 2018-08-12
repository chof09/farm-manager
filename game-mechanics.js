"use strict";

let cash = 300;
let plot = new Array();

let setPlot = function(cropType, n) {

    let crop;
    let price;
    let fertilizePrice;
    let growth;
    let profit;
    let available;

    switch (cropType) {
        case "wheat":
            crop = "Wheat";
            price = 100;
            fertilizePrice = 14;
            growth = 6;
            profit = 55;
            available = 1;
            break;
        case "carrot":
            crop = "Carrot";
            price = 370;
            fertilizePrice = 20;
            growth = 6;
            profit = 95;
            available = 1;
            break;
        case "potato":
            crop = "Potato";
            price = 750;
            fertilizePrice = 37;
            growth = 7;
            profit = 169;
            available = 1;
            break;
        case "tomato":
            crop = "Tomato";
            price = 1500;
            fertilizePrice = 88;
            growth = 9;
            profit = 338;
            available = 1;
            break;
        case "apple":
            crop = "Apple";
            price = 6300;
            fertilizePrice = 183;
            growth = 12;
            profit = 720;
            available = 1;
            break;
    }

    plot[n] = new Plot(crop, price, fertilizePrice, growth, profit, available);

}

// jQuery
$(document).ready(function(){

    // Select / Deselect plots
    let $plot = $('.grid-item.farm');
    let $selectedPlot;
    let $n;
    let $optionsMenu = $('.grid-container.options');
    let $buyMenu = $('.grid-container.buy');
    let $buyOption = $('.buy-btn');

    let $showOptions = function() {
        $buyMenu.addClass('hidden');
        $optionsMenu.removeClass('hidden');
    };

    let $showBuy = function() {
        $optionsMenu.addClass('hidden');
        $buyMenu.removeClass('hidden');
    };

    // Select plot
    $plot.focusin(function() {
        $plot.removeClass('selected');
        $(this).addClass('selected');
        $selectedPlot = $(this);
        $n = $selectedPlot.index();

        // Show Options menu if crop (timeout is there to have time
        // to click BUY! before it gets hidden + on show to not get
        // hidden after last grid-item was deselected)
        if ($(this).html()) {
            // Harvest
            if ($(this).hasClass('harvest')) {
                plot[$n].harvest($n);
            }
            setTimeout($showOptions, 150);
        }
        // Show Buy menu if empty
        else {
            setTimeout($showBuy, 150);
        }

    });

    // Deselect plot
    let $hideMenus = function() {
        $optionsMenu.addClass('hidden');
        $buyMenu.addClass('hidden');
    };

    $plot.focusout(function() {
        $(this).removeClass('selected');

        // Hide menus
        setTimeout($hideMenus, 150);

    });

    // Buy Crop
    $buyOption.click(function() {

        // Create Plot object
        let $crop = $(this).attr("value");
        setPlot($crop, $n);

        if(canAfford(plot[$n].price)) {
            $selectedPlot.html('<img src="imgs/' + $crop + '.png" ondragstart="return false;" />');
            $selectedPlot.addClass('wet');
            plot[$n].timeoutWet($n);
            plot[$n].timeoutHarvestable($n);
            cash -= plot[$n].price;
            updateCash();
        } else {
            // "Delete" Plot object
            plot[$n] = null;
        }
        
    });

    // Game Speed btns
    let $gameSpeedBtn = $('.grid-item.top.speed p a');
    $gameSpeedBtn.click(function() {

        // Get value
        let $btnSpeedValue = $(this).attr('value');

        // Set all btns to inactive
        $('[value="pause"]').html('<img src="imgs/pause-inactive-sm.png" />');
        $('[value="play"]').html('<img src="imgs/play-inactive-sm.png" />');
        $('[value="2xspeed"]').html('<img src="imgs/2xspeed-inactive-sm.png" />');
        $('[value="4xspeed"]').html('<img src="imgs/4xspeed-inactive-sm.png" />');

        // Set clicked btn to active
        $('[value="' + $btnSpeedValue + '"]').html('<img src="imgs/' + $btnSpeedValue + '-active-sm.png" />');

    });

    // Plot options
    // Water
    let $waterCrop = $('#water-crop');
    $waterCrop.click(function() {
        if (!plot[$n].watered) {
            plot[$n].water($n);
        }
    });

    // Fertilize
    let $fertilizeCrop = $('#fertilize-crop');
    $fertilizeCrop.click(function() {
        if (canAfford(plot[$n].fertilizePrice) &&  !plot[$n].readyToHarvest && !plot[$n].fertilized) {
            plot[$n].fertilize($n);
            cash -= plot[$n].fertilizePrice;
            updateCash();
        }
    });

    // Delete
    let $deleteCrop = $('#delete-crop');
    $deleteCrop.click(function() {
        plot[$n].delete($n);
        setTimeout(function() {
            plot[$n] = null;
        }, 150);           
    });

});

let updateCash = function () {
    $('#cash').html('$ ' + cash);
};

let canAfford = function(amount) {
    if (amount > cash) {
        return false;
    } else {
        return true;
    }
};

let getRandomNumber = function(start, range) {
    let getRandom = Math.floor((Math.random() * range) + start);
    while (getRandom > range) {
        getRandom = Math.floor((Math.random() * range) + start);
    }
    return getRandom;
};