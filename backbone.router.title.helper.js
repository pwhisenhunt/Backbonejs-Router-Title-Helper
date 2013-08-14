/** @author Phillip Whisenhunt
 * @description This script aims to make it easier to update the page title of single page
 * applications by providing a single place for maintaining your applications page titles. 
 * See https://github.com/pwhisenhunt/Backbonejs-Router-Title-Helper for more details.
 */
(function(Backbone, _) {
    var originalRoute = Backbone.Router.prototype.route;

    _.extend(Backbone.Router.prototype, {

        _setPromisedTitle: function(title, routeName) {
            var _this = this;
            if (jQuery) {
                if (!jQuery.Deferred) throw new Error("Backbonejs-Router-Title-Helper: jQuery >= 1.5 is required to use Deferred object");
                $.when(title).then(function(deferredTitle) {
                    document.title = deferredTitle;
                    _this.trigger("change:title", routeName, deferredTitle);
                    delete _this.titles[routeName];
                    _this.titles[routeName] = new jQuery.Deferred();
                }, function() {
                    throw new Error("Backbonejs-Router-Title-Helper: Your deferred job failed. No title to set.");
                });
            } else throw new Error("Backbonejs-Router-Title-Helper: Currently only jQuery.Deferred object is supported");
        },

        _setTitle: function(routeName) {
            var title = this.titles[routeName];

            if (!title && !this.titles.default) throw new Error("Backbonejs-Router-Title-Helper: No title found and no default title provided.");
            if (typeof title === "object" && title.promise) return this._setPromisedTitle(title, routeName);
            document.title = typeof title === "function" ? title.apply(this, arguments) :
                this[title] ?  this[title].apply(this, arguments) :
                typeof title === "string" ? title : this.titles.default;
            this.trigger("change:title", routeName, document.title);
        },

        route: function(route, name, callback) {
            var wrappedCallback = function() {
                if(!callback) callback = this[name];
                callback.apply(this, arguments);
                if(this.titles) this._setTitle(name);
            };
            return originalRoute.call(this, route, name, wrappedCallback);
        }
    });
}(Backbone, _));