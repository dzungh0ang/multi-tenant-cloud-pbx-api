module.exports = {
    replace: function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
}