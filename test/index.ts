/// <reference path="../typings/main.d.ts" />

import { PluginGroup } from '../plugin-group';
import {Webcheck} from 'webcheck';

/* tslint:disable:align */


/* tslint:disable:no-empty */
var emptyFunction: Function = (): void => {};
/* tslint:enable:no-empty */

describe('Plugin Group', (): void => {
    var webcheck: Webcheck;
    before((): void => {
        webcheck = new Webcheck({});
    });
    it('should set plugins on instantiation', (): void => {
        var dummyPlugin: any = {},
            group: PluginGroup = new PluginGroup({
                plugins: [dummyPlugin]
            });
        if (group.plugins.length !== 1) {
            throw new Error('No plugin added');
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error('Wrong plugin added');
        }
    });
    it('should push plugins', (): void => {
        var dummyPlugin: any = {},
            anotherPlugin: any = {},
            group: PluginGroup = new PluginGroup({
                plugins: [anotherPlugin]
            });

        group.plugins.push(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error('No plugin added');
        }
        if (group.plugins[1] !== dummyPlugin) {
            throw new Error('Wrong plugin added or on wrong position added');
        }
    });
    it('should unshift plugins', (): void => {
        var dummyPlugin: any = {},
            anotherPlugin: any = {},
            group: PluginGroup = new PluginGroup({
                plugins: [anotherPlugin]
            });

        group.plugins.unshift(dummyPlugin);

        if (group.plugins.length !== 2) {
            throw new Error('No plugin added');
        }
        if (group.plugins[0] !== dummyPlugin) {
            throw new Error('Wrong plugin added or on wrong position added');
        }
    });
    it('should register grouped plugins', (done: MochaDone): void => {
        var dummyPlugin: any = {
                register: (handle: Webcheck): void => {
                    if (handle === webcheck) {
                        return done();
                    }
                    return done(new Error('Wrong webcheck handle passed'));
                }
            },
            group: PluginGroup = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
    });
    it('should register plugins in correct order', (done: MochaDone): void => {
        var first: boolean,
            second: boolean,
            firstPlugin: any = {
                register: (handle: Webcheck): void => {
                    if (handle === webcheck) {
                        first = true;
                        return;
                    }
                    return done(new Error('Wrong webcheck handle passed'));
                }
            },
            secondPlugin: any = {
                register: (handle: Webcheck): void => {
                    if (handle === webcheck && first) {
                        second = true;
                        return;
                    }
                    return done(new Error('Wrong webcheck handle passed or first plugin was not registered first'));
                }
            },
            thirdPlugin: any = {
                register: (handle: Webcheck): void => {
                    if (handle === webcheck && second) {
                        return done();
                    }
                    return done(new Error('Wrong webcheck handle passed or first and second plugin was not registered before'));
                }
            },
            group: PluginGroup = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
    });
    it('should enable grouped plugins', (done: MochaDone): void => {
        var dummyPlugin: any = {
                enable: (): void => {
                    return done();
                },
                register: emptyFunction
            },
            group: PluginGroup = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
        group.enable();
    });
    it('should enable plugins in correct order', (done: MochaDone): void => {
        var first: boolean,
            second: boolean,
            firstPlugin: any = {
                enable: (): void => {
                    first = true;
                },
                register: emptyFunction
            },
            secondPlugin: any = {
                enable: (): void => {
                    if (first) {
                        second = true;
                        return;
                    }
                    done(new Error('Not enabled first plugin before'));
                },
                register: emptyFunction
            },
            thirdPlugin: any = {
                enable: (): void => {
                    if (second) {
                        return done();
                    }
                    done(new Error('Not enabled second plugin before'));
                },
                register: emptyFunction
            },
            group: PluginGroup = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
    });
    it('should disable grouped plugins', (done: MochaDone): void => {
        var dummyPlugin: any = {
                disable: (): void => {
                    return done();
                },
                enable: emptyFunction,
                register: emptyFunction
            },
            group: PluginGroup = new PluginGroup({
                plugins: [dummyPlugin]
            });

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });
    it('should disable plugins in correct order', (done: MochaDone): void => {
        var first: boolean,
            second: boolean,
            firstPlugin: any = {
                disable: (): void => {
                    first = true;
                },
                enable: emptyFunction,
                register: emptyFunction
            },
            secondPlugin: any = {
                disable: (): void => {
                    if (first) {
                        second = true;
                        return;
                    }
                    done(new Error('Not enabled first plugin before'));
                },
                enable: emptyFunction,
                register: emptyFunction
            },
            thirdPlugin: any = {
                disable: (): void => {
                    if (second) {
                        return done();
                    }
                    done(new Error('Not enabled second plugin before'));
                },
                enable: emptyFunction,
                register: emptyFunction
            },
            group: PluginGroup = new PluginGroup({
                plugins: [secondPlugin]
            });

        group.plugins.push(thirdPlugin);
        group.plugins.unshift(firstPlugin);

        webcheck.addPlugin(group);
        group.enable();
        group.disable();
    });

});
