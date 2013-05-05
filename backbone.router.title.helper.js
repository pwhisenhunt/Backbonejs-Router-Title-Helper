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
                if(that.titles[router]) document.title = that.titles[router];
                else if(that.titles.default) document.title = that.titles.default;
                else throw 'Backbone.js Router Title Helper: No title found for route:' + router + ' and no default route specified.';
            }
        });
    }
});