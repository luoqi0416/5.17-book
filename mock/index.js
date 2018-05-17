var homeData = require('./data/home.json');

var jsonObj = {
    '/api/homeJson': homeData
};
module.exports = function(url) {
    return jsonObj['/api/homeJson'];
}