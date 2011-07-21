/*

var anInterface = new Interface({
|   // required
    name: 'anInterface',
    // optional: string/array
    extends: ['baseInterface', 'otherInterface'],
    // required
    methods: {
        oneMethod: null,
        anotherMethod: null,
        yetAnotherMethod: null
    }
    ['oneMethod', 'anotherMethod', 'yetAnotherMethod']);

* */

var Interface = function(config) {
    if (config == null || config == undefined) {
        throw new ArgumentException('Interface must have a configuration.');
    }
    if (config.name == null || config.name == undefined) {
        throw new ArgumentException('Interface must have a name.');
    }
    if (config.methods == null || config.methods == undefined) {
        throw new ArgumentException('Interface must have methods.');
    }
    this.name = config.name;
    this.methods = getMethods(config.methods);

    function getMethods(config) {
        var m = [];
        for (method in config) {
            m.push(method);
        }
        return m;
    }
};

// Static class method.
Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
                arguments.length + "arguments, but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments"
                    + " two and above to be instances of Interface.");
        }
        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object "
                        + "does not implement the " + interface.name
                        + " interface. Method " + method + " was not found.");
            }
        }
    }
};