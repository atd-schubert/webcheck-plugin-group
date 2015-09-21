/*jslint node:true*/
'use strict';

var WebcheckPlugin = require('webcheck/plugin');
var url = require('url');

var pkg = require('./package.json');

/**
 * A Plugin group for webcheck plugins.
 * @author Arne Schubert <atd.schubert@gmail.com>
 * @param {{}} [opts] - Options for this plugin
 * @param {Array} [opts.plugins] - Array of plugin instances
 * @augments Webcheck.Plugin
 * @constructor
 */
var MirrorPlugin = function (opts) {
    WebcheckPlugin.apply(this, arguments);

    opts = opts || {};
    this.plugins = opts.plugins || [];
};

MirrorPlugin.prototype = {
    '__proto__': WebcheckPlugin.prototype,
    package: pkg,

    register: function registerGroups() {
        var i;
        WebcheckPlugin.prototype.register.apply(this, arguments);
        for (i = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].register.apply(this.plugins[i], arguments);
        }
    },
    enable: function enableGroups() {
        var i;
        WebcheckPlugin.prototype.enable.apply(this, arguments);
        for (i = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].enable.apply(this.plugins[i], arguments);
        }
    },
    disable: function disableGroups() {
        var i;
        WebcheckPlugin.prototype.disable.apply(this, arguments);
        for (i = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].disable.apply(this.plugins[i], arguments);
        }
    },
    /**
     * @type {Array}
     */
    plugins: null
};

module.exports = MirrorPlugin;
