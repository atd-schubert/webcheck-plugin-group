# webcheck-plugin-group
Manage groups of [webcheck](https://github.com/atd-schubert/node-webcheck) plugins.

## How to install

```bash
npm install --save webcheck-plugin-group
```

## How to use

```js
var Webcheck = require('webcheck');
var PluginGroup = require('webcheck-plugin-group');

var AnyPlugin = require('webcheck-any-plugin');

var firstPlugin = new AnyPlugin();
var secondPlugin = new AnyPlugin();
var thirdPlugin = new AnyPlugin();

var group = PluginGroup({
    plugins: [secondPlugin]
});

group.plugins.push(thirdPlugin);
group.plugins.unshift(firstPlugin);

var webcheck = new Webcheck();
webcheck.addPlugin(group);  // Register all plugins in group

group.enable();             // Enable all plugins in group in correct order

// group.disable();         // Disable all plugins in group

```

## Options
- `plugins`: Array of plugins.
