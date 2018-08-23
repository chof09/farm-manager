
function Plot(crop, price, fertilizePrice, growth, profit, available) {
    let self = this;

    this.crop = crop;
    this.watered = 1;
    this.price = price;
    this.fertilizePrice = fertilizePrice;
    this.growth = growth;
    this.profit = profit;
    this.available = 0;
    this.fertilized = 0;
    this.readyToHarvest = 0;

    this.wetID;
    this.dryID = -1;
    this.harvestableID = -1;

    // Watered state expires in 150 sec (6 mo)
    this.timeoutWet = function(n) {
        this.wetID = setTimeout(function() {
            self.watered = 0;
            let $wateredPlot = $('.grid-item.farm:eq(' + n + ')');
            $wateredPlot.removeClass('wet');
            $wateredPlot.removeClass('fertilized');
            $wateredPlot.addClass('dry');
            drySound.play();
            self.timeoutDry(n);
        }, 6*25000);
    }

    this.timeoutDry = function(n) {
        this.dryID = setTimeout(function() {
            self.delete(n);
        }, 15000);
    }

    this.timeoutHarvestable = function(n) {
        this.harvestableID = setTimeout(function() {
            self.readyToHarvest = 1;
            let $harvestablePlot = $('.grid-item.farm:eq(' + n + ')');
            $harvestablePlot.addClass('harvest');
            readySound.play();
        }, this.growth*25000);
    }

    this.water = function(n) {
        this.watered = 1;
        if (this.dryID > 0) {
            clearTimeout(this.dryID);
        }
        if (this.wetID) {
            clearTimeout(this.wetID);
        }
        let $plotToWater = $('.grid-item.farm:eq(' + n + ')');
        $plotToWater.removeClass('dry');
        if (this.fertilized) {
            $plotToWater.addClass('fertilized');
        } else {
            $plotToWater.addClass('wet');
        }
        waterSound.play();
        this.timeoutWet(n);
    }

    this.delete = function(n) {
        clearTimeout(this.wetID);
        this.watered = 0;
        this.fertilized = 0;
        if (this.dryID > 0) {
            clearTimeout(this.dryID);
        }
        if (this.harvestableID > 0) {
            clearTimeout(this.harvestableID);
        }
        let $plotToDelete = $('.grid-item.farm:eq(' + n + ')');
        $plotToDelete.removeClass('dry');
        $plotToDelete.removeClass('wet');
        $plotToDelete.removeClass('harvest');
        $plotToDelete.removeClass('fertilized');
        $plotToDelete.html('');
        if ($plotToDelete.is(':focus')) {
            $plotToDelete.blur();
        }
    }

    // Fertalized state expires when harvested
    this.fertilize = function(n) {
        this.fertilized = 1;
        let $fertilizedPlot = $('.grid-item.farm:eq(' + n + ')');
        if (this.watered) {
            $fertilizedPlot.removeClass('wet');
            $fertilizedPlot.addClass('fertilized');
        }
        fertilizeSound.play();
    }

    this.harvest = function(n) {
        let $plotToHarvest = $('.grid-item.farm:eq(' + n + ')');
        $plotToHarvest.removeClass('fertilized');
        $plotToHarvest.removeClass('harvest');
        // gerRnadomNumber(start, range, order)   order = 2 === 100
        let $myProfit = this.profit * getRandomNumber(91, 100, 2);
        if (this.fertilized) {
            cash += Math.ceil($myProfit * 1.2);
        } else {
            cash += Math.ceil($myProfit);
        }
        updateCash();
        this.readyToHarvest = 0;
        this.fertilized = 0;
        this.timeoutHarvestable(n);
    }

}