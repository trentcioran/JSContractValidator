/*

var anInterface = new Interface({
    // required: interface name
    name: 'anInterface',
    // optional: type / type array
    extends: [baseInterface, otherInterface],
    // required: methods defined by contract
    methods: {
        oneMethod: null,
        anotherMethod: null,
        yetAnotherMethod: null
    }
    // alternate way to define methods, string array
    //methods: ['oneMethod', 'anotherMethod', 'yetAnotherMethod']
);

* */

var Interface = function(config) {
    if (config == null || config == undefined) {
        throw new Error('Interface must have a configuration.');
    }
    if (config.name == null || config.name == undefined) {
        throw new Error('Interface must have a name.');
    }
    if (config.methods == null || config.methods == undefined) {
        throw new Error('Interface must have methods.');
    }
    this.name = config.name;

    // validate has a extends configuration
    if (config.extends) {
        if (typeof(config.extends) != 'object') {
            throw new Error('Extends property should be a type or an array of interface types.');
        }

        // check if it is an array
        if (config.extends instanceof Array) {
            for (var idx = 0; idx < config.extends.length; idx++) {
                var ele = config.extends[idx];
                if (typeof(ele) != 'object' || !(ele instanceof Interface)) {
                    throw new Error('[' + ele + '] is not a instance of an Interface');
                }
            }
        }
    }
    this.methods = getMethods(config.methods, config.extends);

    function getMethods(methods, extends) {
        var m = Reflection.getMembers(methods);
        if (extends) {
            if (extends instanceof Array) {
                for (var idx = 0; idx < extends.length; idx++) {
                    m.concat(Reflection.getMembers(extends[idx].methods));
                }
            } else {
                m.concat(Reflection.getMembers(extends.methods));
            }
        }
        return m;
    }
};


Interface.ensureImplements = function() {
    if (arguments.length < 2) {
        throw new Error("Interface.ensureImplements called with " +
                arguments.length + "arguments, but expected at least 2.");
    }
    var instance = arguments[0];
    
    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Interface.ensureImplements expects arguments"
                    + " two and above to be instances of Interface.");
        }
        var instanceMembers = Reflection.getMembers(instance);
        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (instance[method]) {
                if (typeof instance[method] != 'function') {
                    throw new Error("Function Interface.ensureImplements: object "
                            + "does not implement the " + interface.name
                            + " interface. Method " + method + " was not found.");
                }
            }
        }
    }
};