import {Webcheck} from "webcheck";
import { PluginGroup } from "../";

const emptyFunction: (...args: any[]) => void = (): void => { /* empty function */ };

describe("Plugin Group", (): void => {
    const webcheck: Webcheck = new Webcheck();
    it("should set plugins on instantiation", (): void => {
        const dummyPlugin: any = {};
        const group: PluginGroup = new PluginGroup({
            plugins: [dummyPlugin],
        });
        if (group.plugins.length !== 1) {
            throw new Error("No plugin added");
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error("Wrong plugin added");
        }
    });
    it("should push plugins", (): void => {
        const dummyPlugin: any = {};
        const anotherPlugin: any = {};
        const group: PluginGroup = new PluginGroup({
            plugins: [anotherPlugin],
        });

        group.plugins.push(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error("No plugin added");
        }
        if (group.plugins[1] !== dummyPlugin) {
            throw new Error("Wrong plugin added or on wrong position added");
        }
    });
    it("should unshift plugins", (): void => {
        const dummyPlugin: any = {};
        const anotherPlugin: any = {};
        const group: PluginGroup = new PluginGroup({
            plugins: [anotherPlugin],
        });

        group.plugins.unshift(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error("No plugin added");
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error("Wrong plugin added or on wrong position added");
        }
    });
    it("should register grouped plugins", (done: Mocha.Done): void => {
        const dummyPlugin: any = {
            register: (handle: Webcheck): void => {
                if (handle === webcheck) {
                    return done();
                }
                return done(new Error("Wrong webcheck handle passed"));
            },
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [dummyPlugin],
        });

        webcheck.addPlugin(group);
    });
    it("should register plugins in correct order", (done: Mocha.Done): void => {
        let first: boolean;
        let second: boolean;
        const firstPlugin: any = {
            register: (handle: Webcheck): void => {
                if (handle === webcheck) {
                    first = true;
                    return;
                }
                return done(new Error("Wrong webcheck handle passed"));
            },
        };
        const secondPlugin: any = {
            register: (handle: Webcheck): void => {
                if (handle === webcheck && first) {
                    second = true;
                    return;
                }
                return done(new Error("Wrong webcheck handle passed or first plugin was not registered first"));
            },
        };
        const thirdPlugin: any = {
            register: (handle: Webcheck): void => {
                if (handle === webcheck && second) {
                    return done();
                }
                return done(new Error(
                    "Wrong webcheck handle passed or first and second plugin was not registered before",
                ));
            },
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [secondPlugin],
        });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
    });
    it("should enable grouped plugins", (done: Mocha.Done): void => {
        const dummyPlugin: any = {
            enable: (): void => {
                return done();
            },
            register: emptyFunction,
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [dummyPlugin],
        });

        webcheck.addPlugin(group);
        group.enable();
    });
    it("should enable plugins in correct order", (done: Mocha.Done): void => {
        let first: boolean;
        let second: boolean;
        const firstPlugin: any = {
            enable: (): void => {
                first = true;
            },
            register: emptyFunction,
        };
        const secondPlugin: any = {
            enable: (): void => {
                if (first) {
                    second = true;
                    return;
                }
                done(new Error("Not enabled first plugin before"));
            },
            register: emptyFunction,
        };
        const thirdPlugin: any = {
            enable: (): void => {
                if (second) {
                    return done();
                }
                done(new Error("Not enabled second plugin before"));
            },
            register: emptyFunction,
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [secondPlugin],
        });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
    });
    it("should disable grouped plugins", (done: Mocha.Done): void => {
        const dummyPlugin: any = {
            disable: (): void => {
                return done();
            },
            enable: emptyFunction,
            register: emptyFunction,
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [dummyPlugin],
        });

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });
    it("should disable plugins in correct order", (done: Mocha.Done): void => {
        let first: boolean;
        let second: boolean;
        const firstPlugin: any = {
            disable: (): void => {
                first = true;
            },
            enable: emptyFunction,
            register: emptyFunction,
        };
        const secondPlugin: any = {
            disable: (): void => {
                if (first) {
                    second = true;
                    return;
                }
                done(new Error("Not enabled first plugin before"));
            },
            enable: emptyFunction,
            register: emptyFunction,
        };
        const thirdPlugin: any = {
            disable: (): void => {
                if (second) {
                    return done();
                }
                done(new Error("Not enabled second plugin before"));
            },
            enable: emptyFunction,
            register: emptyFunction,
        };
        const group: PluginGroup = new PluginGroup({
            plugins: [secondPlugin],
        });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });

});
