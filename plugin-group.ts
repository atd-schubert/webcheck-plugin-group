import { IWebcheck, Plugin as WebcheckPlugin } from "webcheck";
import * as pkg from "./package.json";

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

    public register(handle: IWebcheck): this {
        super.register(handle);
        for (const plugin of this.plugins) {
            plugin.register(handle);
        }
        return this;
    }
    public enable(...args: any[]): this {
        super.enable(...args);
        for (const plugin of this.plugins) {
            plugin.enable(...args);
        }
        return this;
    }
    public disable(): this {
        super.disable();
        for (const plugin of this.plugins) {
            plugin.disable();
        }
        return this;
    }
}
