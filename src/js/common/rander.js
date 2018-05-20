define(['jquery', 'handle'], function($, hand) {

    function rander(data, source, content, isHtml) {
        hand.registerHelper('addIndex', function(key) { return key + 1; });
        hand.registerHelper('two', function(index1) {
            return index1 + 2;
        });
        hand.registerHelper('limit', function(key) {
            if (key < 5) { return true } else { return false }
        });
        hand.registerHelper('if0', function(key1, key2) {
            if (key1 == key2) { return true } else { return false }
        });
        hand.registerHelper('type', function(type) {
            return type.match(/[a-zA-z]+:\/\/[^\s;$]*/g);
        });
        if (isHtml) {
            content.html(hand.compile(source.html())(data));
        } else {
            content.append(hand.compile(source.html())(data));
        };
    };
    return rander;
})