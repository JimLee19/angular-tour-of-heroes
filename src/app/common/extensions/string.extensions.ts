if (!String.prototype.hasOwnProperty('format')) {
    String.prototype.format = function () {
        return this;
    };
}
