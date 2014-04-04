/** @author Phillip Whisenhunt
 * @description This script aims to make it easier to update the page title of single page
 * applications by providing a single place for maintaining your applications page titles.
 * See https://github.com/pwhisenhunt/Backbonejs-Router-Title-Helper for more details.
 */
/*jslint browser: true*/
/*globals define, $*/
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], factory);
    } else {
        factory(_, Backbone);
    }
}(function (_, Backbone) {
    'use strict';

    var originalRoute = Backbone.Router.prototype.route;

    _.extend(Backbone.Router.prototype, {

        _setPromisedTitle: function (title, routeName) {
            var _this = this;

            if (!jQuery) {
                throw new Error('Backbonejs-Router-Title-Helper: Currently only jQuery.Deferred object is supported');
            }

            if (!jQuery.Deferred) {
                throw new Error('Backbonejs-Router-Title-Helper: jQuery >= 1.5 is required to use Deferred object');
            }

            $.when(title).then(function (deferredTitle) {
                document.title = deferredTitle;
                _this.trigger('change:title', routeName, deferredTitle);
                delete _this.titles[routeName];
                _this.titles[routeName] = new jQuery.Deferred();
            }, function () {
                throw new Error('Backbonejs-Router-Title-Helper: Your deferred job failed. No title to set.');
            });
        },

        _setTitle: function (routeName) {
            var title = this.titles[routeName], newTitle;

            if (_.isUndefined(title) && _.isUndefined(this.titles['default'])) {
                throw new Error('Backbonejs-Router-Title-Helper: No title found and no default title provided.');
            }

            if (_.has(title, 'promise')) {
                return this._setPromisedTitle(title, routeName);
            }

            if (_.isFunction(title)) {
                newTitle = title.apply(this, arguments);
            } else if (this[title]) {
                newTitle = this[title].apply(this, arguments);
            } else if (_.isString(title)) {
                newTitle = title;
            } else if (_.isFunction(this.titles['default'])) {
                newTitle = this.titles['default'].apply(this, arguments);
            } else {
                newTitle = this.titles['default'];
            }

            document.title = newTitle;

            this.trigger('change:title', routeName, newTitle);
        },

        route: function (route, name, callback) {
            var wrappedCallback = function () {
                if (!callback) {
                    callback = this[name];
                }

                callback.apply(this, arguments);

                if (this.titles) {
                    this._setTitle(name);
                }
            };

            return originalRoute.call(this, route, name, wrappedCallback);
        }
    });
}));
