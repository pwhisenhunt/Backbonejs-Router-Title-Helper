describe('RouterTitleHelper', function () {

	var defaultRouterOptions = {
		trigger: true,
		forceFragment: true
	};

	before(function () {
		AppRouter = Backbone.Router.extend({
			initialize: function() {},
			routes: {
				"items": "index",
				"items/:id": "show",
				"items/:id/edit": "edit",
				"items/:id/details": "details"
			},
			titles: {
				"index": "Index Title",
				"edit": function() {
					return "Editing item";
				},
				"details": "detailsTitle",
				"default": "Default Title"
			},
			index: function() {},
			show: function() {},
			edit: function() {},
			details: function() {},
			detailsTitle: function() {
				return "Item details";
			}
		});
		this.initializerSpy = sinon.spy(AppRouter.prototype, "initialize");
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

	it('should safely extend custom initializer function', function () {
		this.initializerSpy.should.have.been.calledOnce;
	});

	it('should change title to `Default Title` when no title specified', function () {
		this.router.bind("route:show", this.routeSpy);
		this.router.navigate("items/1", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Default Title");
	});
	
	it('should change title to `Default Title as return value of function` when no title specified and default title value defined using function', function () {
		this.router.titles["default"] = function () { return "Default Title as return value of function" };
		this.router.bind("route:show", this.routeSpy);
		this.router.navigate("items/1", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Default Title as return value of function");
	});

	it('should change title to `Index Title` when it is specified in `titles` as a title for `index` route', function () {
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

	it('should change title to return value of function if a router method with this name found', function () {
		this.router.bind("route:details", this.routeSpy);
		this.router.navigate("items/1/details", defaultRouterOptions);
		this.routeSpy.should.have.been.callOnce;
		document.title.should.equal("Item details");
	});
});