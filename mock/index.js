var homeData = require('./data/home.json'),
    bookData = require('./data/bookDetail.json'),
    searchData = require('./data/searchKey.json'),
    recommendData1 = require('./data/recommend/recommend1.json'),
    recommendData2 = require('./data/recommend/recommend2.json'),
    recommendData3 = require('./data/recommend/recommend3.json');
var jsonObj = {
    '/api/homeJson': homeData,
    '/api/bookJson': bookData,
    '/api/searchJson': searchData,
    '/api/recommed?pageNum=1&count=10': recommendData1,
    '/api/recommed?pageNum=2&count=10': recommendData2,
    '/api/recommed?pageNum=3&count=10': recommendData3,
};
module.exports = function(url) {
    return jsonObj[url];
}