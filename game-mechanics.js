"use strict";

let cash = 300;
let plot = new Array();

let setPlot = function(cropType, n) {

    let crop;
    let state;
    let price;
    let growth;
    let profit;
    let available;

    switch (cropType) {
        case "wheat":
            crop = "Wheat";
            state = "Wet";
            price = 100;
            growth = 6;
            profit = 55;
            available = 1;
            break;
        case "carrot":
            crop = "Carrot";
            state = "Wet";
            price = 370;
            growth = 6;
            profit = 95;
            available = 1;
            break;
        case "potato":
            crop = "Potato";
            state = "Wet";
            price = 750;
            growth = 7;
            profit = 169;
            available = 1;
            break;
        case "tomato":
            crop = "Tomato";
            state = "Wet";
            price = 1500;
            growth = 9;
            profit = 338;
            available = 1;
            break;
        case "apple":
            crop = "Apple";
            state = "Wet";
            price = 6300;
            growth = 12;
            profit = 720;
            available = 1;
            break;
    }

    plot[n] = new Plot(crop, state, price, growth, profit, available);
}

// jQuery
$(document).ready(function(){

    // Select / Deselect plots
    let $plot = $('.grid-item.farm');
    let $selectedPlot;
    let $optionsMenu = $('.grid-container.options');
    let $buyMenu = $('.grid-container.buy');
    let $buyOption = $('.buy-btn');

    // Select plot
    $plot.focusin(function() {
        $plot.removeClass('selected');
        $(this).addClass('selected');
        $selectedPlot = $(this);

        let $showOptions = function() {
            $buyMenu.addClass('hidden');
            $optionsMenu.removeClass('hidden');
        };

        let $showBuy = function() {
            $optionsMenu.addClass('hidden');
            $buyMenu.removeClass('hidden');
        };

        // Show Options menu if crop (timeout is there to have time
        // to click BUY! before it gets hidden + on show to not get
        // hidden after last grid-item was deselected)
        if ($(this).html()) {
            setTimeout($showOptions, 100);
        }
        // Show Buy menu if empty
        else {
            setTimeout($showBuy, 100);
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
        setTimeout($hideMenus, 100);

    });

    // Buy Crop
    $buyOption.click(function() {

        // Create Plot object
        let $crop = $(this).attr("value");
        let $n = $(this).index();
        setPlot($crop, $n);

        if((cash - plot[$n].price) >= 0) {
            $selectedPlot.html('<img src="imgs/' + $crop + '.png" ondragstart="return false;" />');
            $selectedPlot.addClass('wet');
            plot[$n].timeoutWet($n);
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

    let updateCash = function () {
        $('#cash').html('$ ' + cash);
    }

});