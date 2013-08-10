describe('RouterTitleHelper', function () {

	var defaultRouterOptions = {
		trigger: true,
		forceFragment: true
	};

	before(function () {
		AppRouter = Backbone.Router.extend({
			routes: {
				"items": "index",
				"items/:id": "show",
				"items/:id/edit": "edit"
			},
			titles: {
				"index": "Index Title",
				"default": "Default Title",
				"edit": function() {
					return "Editing item"
				}
			},
			index: function() {
				console.log("Hello from #index");
			},
			show: function(id) {
				console.log("Hello from #show, id: "+id);
			},
			edit: function(id) {
				console.log("Hello from #edit, id: "+id);
			}
		});
		this.router = new AppRouter();
		this.routeSpy = sinon.spy();
	});

	beforeEach(function () {
		Backbone.history.start({root: ""});
		this.routeSpy.reset();
	});

	afterEach(function () {
		this.router.navigate("items", defaultRouterOptions);
		Backbone.history.stop();
	});

	it('should change title to `Default Title` when no title specified', function () {
		this.router.bind("route:show", this.routeSpy);
		this.router.navigate("items/1", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Default Title");
	});

	it('should change title to `Index Title` when it is specified in `titles` as a tilte for `index` route', function () {
		this.router.bind("route:index", this.routeSpy);
		this.router.navigate("items/1", defaultRouterOptions);
		this.router.navigate("items", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Index Title");
	});

	it('should change title to return value of function provided as a title', function () {
		this.router.bind("route:edit", this.routeSpy);
		this.router.navigate("items/1/edit", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Editing item");
	});
});