/*jslint node:true*/

/*global describe, it, before, after, beforeEach, afterEach*/

'use strict';

var PluginGroup = require('../');

var Webcheck = require('webcheck');

/*jslint debug:true*/
var emptyFunction = function () {};
/*jslint debug:false*/

describe('Plugin Group', function () {
    var webcheck;
    before(function () {
        webcheck = new Webcheck();
    });
    it('should set plugins on instantiation', function () {
        var dummyPlugin = {},
            group = new PluginGroup({
                plugins: [dummyPlugin]
            });
        if (group.plugins.length !== 1) {
            throw new Error('No plugin added');
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error('Wrong plugin added');
        }
    });
    it('should push plugins', function () {
        var dummyPlugin = {},
            group = new PluginGroup({
                plugins: [{}]
            });

        group.plugins.push(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error('No plugin added');
        }
        if (group.plugins[1] !== dummyPlugin) {
            throw new Error('Wrong plugin added or on wrong position added');
        }
    });
    it('should unshift plugins', function () {
        var dummyPlugin = {},
            group = new PluginGroup({
                plugins: [{}]
            });

        group.plugins.unshift(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error('No plugin added');
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error('Wrong plugin added or on wrong position added');
        }
    });
    it('should register grouped plugins', function (done) {
        var dummyPlugin = {
                register: function (handle) {
                    if (handle === webcheck) {
                        return done();
                    }
                    return done(new Error('Wrong webcheck handle passed'));
                }
            },
            group = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
    });
    it('should register plugins in correct order', function (done) {
        var first,
            second,
            firstPlugin = {
                register: function (handle) {
                    if (handle === webcheck) {
                        first = true;
                        return;
                    }
                    return done(new Error('Wrong webcheck handle passed'));
                }
            },
            secondPlugin = {
                register: function (handle) {
                    if (handle === webcheck && first) {
                        second = true;
                        return;
                    }
                    return done(new Error('Wrong webcheck handle passed or first plugin was not registered first'));
                }
            },
            thirdPlugin = {
                register: function (handle) {
                    if (handle === webcheck && second) {
                        return done();
                    }
                    return done(new Error('Wrong webcheck handle passed or first and second plugin was not registered before'));
                }
            },
            group = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
    });
    it('should enable grouped plugins', function (done) {
        var dummyPlugin = {
                register: emptyFunction,
                enable: function () {
                    return done();
                }
            },
            group = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
        group.enable();
    });
    it('should enable plugins in correct order', function (done) {
        var first,
            second,
            firstPlugin = {
                register: emptyFunction,
                enable: function () {
                    first = true;
                }
            },
            secondPlugin = {
                register: emptyFunction,
                enable: function () {
                    if (first) {
                        second = true;
                        return;
                    }
                    done(new Error('Not enabled first plugin before'));
                }
            },
            thirdPlugin = {
                register: emptyFunction,
                enable: function () {
                    if (second) {
                        return done();
                    }
                    done(new Error('Not enabled second plugin before'));
                }
            },
            group = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
    });
    it('should disable grouped plugins', function (done) {
        var dummyPlugin = {
                register: emptyFunction,
                enable: emptyFunction,
                disable: function () {
                    return done();
                }
            },
            group = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });
    it('should disable plugins in correct order', function (done) {
        var first,
            second,
            firstPlugin = {
                register: emptyFunction,
                enable: emptyFunction,
                disable: function () {
                    first = true;
                }
            },
            secondPlugin = {
                register: emptyFunction,
                enable: emptyFunction,
                disable: function () {
                    if (first) {
                        second = true;
                        return;
                    }
                    done(new Error('Not enabled first plugin before'));
                }
            },
            thirdPlugin = {
                register: emptyFunction,
                enable: emptyFunction,
                disable: function () {
                    if (second) {
                        return done();
                    }
                    done(new Error('Not enabled second plugin before'));
                }
            },
            group = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });

});
