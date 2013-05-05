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