/// <reference path="./typings/main.d.ts" />

import { Plugin as WebcheckPlugin } from 'webcheck';
import * as pkg from './package.json';

export interface ISimplifiedRegExpr {
    test(txt: string): boolean;
}

export interface IPluginGroupOptions {
    plugins?: WebcheckPlugin[];
}

/**
 * A Plugin group for webcheck plugins.
 * @author Arne Schubert <atd.schubert@gmail.com>
 * @param {{}} [opts] - Options for this plugin
 * @param {Array} [opts.plugins] - Array of plugin instances
 * @augments WebcheckPlugin
 * @constructor
 */
export class PluginGroup extends WebcheckPlugin {
    public plugins: WebcheckPlugin[];
    public package: any = pkg;

    constructor(opts: IPluginGroupOptions) {
        super();
        this.plugins = opts.plugins || [];
    }

    public register(): PluginGroup {
        WebcheckPlugin.prototype.register.apply(this, arguments);
        for (let i: number = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].register.apply(this.plugins[i], arguments);
        }
        return this;
    }
    public enable(): PluginGroup {
        WebcheckPlugin.prototype.enable.apply(this, arguments);
        for (let i: number = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].enable.apply(this.plugins[i], arguments);
        }
        return this;
    }
    public disable(): PluginGroup {
        WebcheckPlugin.prototype.disable.apply(this, arguments);
        for (let i: number = 0; i < this.plugins.length; i += 1) {
            this.plugins[i].disable.apply(this.plugins[i], arguments);
        }
        return this;
    }
}
