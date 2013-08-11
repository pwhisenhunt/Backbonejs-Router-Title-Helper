/** @author Phillip Whisenhunt
 * @description This script aims to make it easier to update the page title of single page
 * applications by providing a single place for maintaining your applications page titles. 
 * See https://github.com/pwhisenhunt/Backbonejs-Router-Title-Helper for more details.
 */
Backbone.Router = Backbone.Router.extend({

    initialize: function(options){
        var that = this;

        this.on('route', function(router, route, params) {

            if(that.titles) {
                var title = that.titles[router];
                if(title) {
                    if(typeof title === "function") {
                        document.title = title.apply(this, arguments);
                    } else {
                        document.title = that[title] ? that[title].apply(this, arguments) : title;
                    }
                } else if(that.titles.default) document.title = that.titles.default;
                else throw 'Backbone.js Router Title Helper: No title found for route:' + router + ' and no default route specified.';
            }
        });
    }
});
