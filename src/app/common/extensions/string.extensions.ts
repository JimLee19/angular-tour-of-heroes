if (!String.prototype.hasOwnProperty('format')) {
    String.prototype.format = function () {
        return this;
    };
}
if (!String.prototype.hasOwnProperty('startsWith')) {
    String.prototype.startsWith = function (str) {
        const reg = new RegExp(`^${str}`);
        return reg.test(this);
    };
}

if (!String.prototype.hasOwnProperty('endsWith')) {
    String.prototype.endsWith = function (str) {
        const reg = new RegExp(`${str}$`);
        return reg.test(this);
    };
}