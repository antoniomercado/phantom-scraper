var bluebird = require("bluebird");
var cheerio = require("cheerio");
var baseUrl = "https://www.google.com/";
var url = baseUrl + "/search?q=televisions&source=univ&tbm=shop";

// Export must adhere to this interface
module.exports = {
    url: url,
    // This function should return a promise that ultimately resolves
    callback: function (body, store, phInstance) {
        var $ = cheerio.load(body);
        $('.psli').each(function(i, el){
            var name = $('.pstl', this).text();
            var price = $('.price b', this).text();
            store[name] = price;
        });
    
        return bluebird.resolve();
    }
};
