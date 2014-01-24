var path = require('path');
require("fs").readdirSync("./controllers").forEach(function(file) {
    var name;
    if (!(/[a-z]+.js$/g).test(file) && file != "index.js") {
        return false;
    }         
    name = path.basename(file, '.js');
    module.exports[name] = require("./" + file);
});
