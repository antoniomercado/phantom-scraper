var fs = require('fs');
var bluebird = require("bluebird");
var path = require('path');
var phantom = require('phantom');
var file_path = path.resolve('./scrapers');
var files = fs.readdirSync(file_path);

var promises = [];
var items = {};
try {
    for (var i = 0; i < files.length; ++i) {
        var r = require(file_path + '/' + files[i]);
        if (typeof r === "object" &&
            typeof r.url === "string" &&
            typeof r.callback === "function") {
            (function (_r, _itemStore) {
                var page;
                var phInstance;
                var _this = this;
                promises.push(phantom.create(['--ignore-ssl-errors=true']).then(function (ph) {
                    phInstance = ph;
                    return ph.createPage();
                }).then(function (p) {
                    page = p;
                    page.setting('userAgent', "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36");
                    return page.open(_r.url);
                }).then(function () {
                    return page.property('content');
                }).then(function (c) {
                    return bluebird.resolve(r.callback.call(_this, c, _itemStore, phInstance));
                }).then(function () {
                    phInstance.exit();
                }));
            })(r, items);
        }
    }
    bluebird.all(promises).then(function (results) {
        console.log(items);
    });
} catch (e) {
    console.log(e);
}