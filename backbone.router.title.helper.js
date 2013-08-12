/** @author Phillip Whisenhunt
 * @description This script aims to make it easier to update the page title of single page
 * applications by providing a single place for maintaining your applications page titles. 
 * See https://github.com/pwhisenhunt/Backbonejs-Router-Title-Helper for more details.
 */
(function(Backbone, _) {
    var originalRoute = Backbone.Router.prototype.route;

    _.extend(Backbone.Router.prototype, {
        route: function(route, name, callback) {
            var wrappedCallback = function() {
                if (this.titles) {
                    var title = this.titles[name];

                    if(title) {
                        if(typeof title === "function") {
                            document.title = title.apply(this, arguments);
                        } else if(typeof title === "object" && title.promise) {
                            _this = this;
                            $.when(title).then(function(deferredTitle) {
                                document.title = deferredTitle;
                                delete _this.titles[name];
                                _this.titles[name] = new jQuery.Deferred();
                            }, function() {
                                throw("Your deferred job failed. No title to set.")
                            });
                        } else {
                            document.title = this[title] ? this[title].apply(this, arguments) : title;
                        }
                    } else if(this.titles.default) document.title = this.titles.default;
                }
                if(!callback) callback = this[name];
                callback.apply(this, arguments);
            };
            return originalRoute.call(this, route, name, wrappedCallback);
        }
    });
}(Backbone, _));