
function Plot(crop, watered, price, growth, profit, available) {
    this.crop = crop;
    this.watered = 1;
    this.price = price;
    this.growth = growth;
    this.profit = profit;
    this.available = 0;
    this.fertilized = 0;

    // Watered state expires in 150 sec (6 mo)
    this.timeoutWet = function(n) {
        setTimeout(function() {
            this.watered = 0;
            let $wateredPlot = $('.grid-item.farm:eq(' + n + ')');
            $wateredPlot.addClass('dry');
            $wateredPlot.removeClass('wet');

        }, this.growth*25000);
    };

    // Fertalized state expires in 
    this.setFertalized = function(n) {
            this.fertilized = 0;
            let $fertilizedPlot = $('.grid-item.farm:eq(' + n + ')');
            $fertilizedPlot.addClass('fertilized');
            $fertilizedPlot.removeClass('wet');
        };

}