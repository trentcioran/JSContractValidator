var Reflection = {};

Reflection.getMembers = function(obj) {
    var m = [];
    for (var prop in obj) {
        m.push(prop);
    }
    return m;
};

Reflection.getPropertyNames = function(obj) {
    var m = [];
    for (var prop in obj) {
        if (typeof(this[prop]) != 'function') {
            m.push(prop);
        }
    }
    return m;
};

Reflection.getMethodNames = function(obj) {
    var m = [];
    for (var method in obj) {
        if (typeof(this[method]) == 'function') {
            m.push(method);
        }
    }
    return m;
};