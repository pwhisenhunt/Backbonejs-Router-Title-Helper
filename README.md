Backbone.js Router Title Helper
==============================

When developing single page applications the page title is often over looked and the usability of your application suffers. This script aims to make it easier to update the page title of your application by providing a single place for maintaining your applications page titles. This script overrides the Backbone.js Router to provide page title updates based on the current route. Note: if you have another plugin that touches the Backbone.Router you may run into issues.

## Use
This script is tested against Backbone.js 1.0.0. Include the script in your page after Backbone.js has loaded.

```javascript
<script src="backbone.js" type="text/javascript"></script>
<script src="backbone.router.title.helper.js" type="text/javascript"></script>
```
 and then in your router provide a titles object literal whose keys map to route function names and whose values are page titles. Be sure to provide a default for routes to fall back to in case you forget to include a title. An error is thrown if you fail to specify a routes title and a default title is not found. Example router:

```javascript
var Router = Backbone.Router.extend({
    routes: {
        'a': 'aRoute',
        'b': 'bRoute'
    },

    titles: {
        'aRoute': 'aTitle',
        // this is the default title that routes will fall back to
        'default': 'defaultRoute'
    },

    aRoute: function() {
        // This will trigger the page title aRoute
    },

    bRoute: function() {   
        // This will trigger the page title defaultRoute since there is no bRoute specified
    }
});
```

It is allowed to specify function or a router method name to set its return value as a title. This is useful, when you need to compute value for a title. For example:

```javascript
var Router = Backbone.Router.extend({
    ...

    appName: "Sample Application",

    titles: {
        'cRoute': function() {
            return "cRouteTitle — " + this.appName;
        },
        'dRoute': "dRouteTitle"
    },

    dRouteTitle: function() {
        return "dRouteTitle — " + this.appName;
    }

    ...
});
```

If for some reason you need to have an initialize function in your router, remember to call the super class so that the page titles still work. An example calling the super class:

```javascript
var Router = Backbone.Router.extend({
    ...

    initialize: function(options) {
        // call the super classes initialize
        this.constructor.__super__.initialize.apply(this, [options]);
    }

    ...
});
```

## Contribution

Feel free to contiribute!

Use `grunt mocha` run tests and `grunt uglify:build` to build minified version.
It is required to run `npm install` in the project directory first to fetch dependencies.
