describe('Base Router', function() {
  beforeEach(function() {
    this.router = new Backbone.BaseRouter();
    var suite = this;
    this.router.onNavigate = function(routeData) {
      suite.routeData = routeData;
    };
    this.sinon.spy(this.router, 'onNavigate');
  });

  describe('when routing to a matched route with pushState', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/example');
      this.router.route('example', {hungry: true});
      Backbone.history.start({pushState: true});
      this.regularKeys = ['linked', 'route', 'originalRoute', 'params', 'query', 'queryString', 'router', 'uriFragment'];
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the correct arguments to onNavigate', function() {
      expect(this.routeData).to.have.keys(this.regularKeys);
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal({hungry: true});
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route without pushState', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#example');
      this.router.route('example', {hungry: true});
      Backbone.history.start({pushState: false});
      this.regularKeys = ['linked', 'route', 'originalRoute', 'params', 'query', 'queryString', 'router', 'uriFragment'];
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the correct arguments to onNavigate', function() {
      expect(this.routeData).to.have.keys(this.regularKeys);
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal({hungry: true});
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route with pushState that has named params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/books/2/chapter/4');
      this.callback = function() {};
      this.router.route('books/:id/chapter/:chapter', this.callback);
      Backbone.history.start({pushState: true});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('books/:id/chapter/:chapter');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('books/2/chapter/4');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass the parsed URI params', function() {
      expect(this.routeData.params).to.deep.equal({id: '2', chapter: '4'});
    });
  });

  describe('when routing to a matched route without pushState that has named params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#books/2/chapter/4');
      this.callback = function() {};
      this.router.route('books/:id/chapter/:chapter', this.callback);
      Backbone.history.start({pushState: false});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('books/:id/chapter/:chapter');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('books/2/chapter/4');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass the parsed URI params', function() {
      expect(this.routeData.params).to.deep.equal({id: '2', chapter: '4'});
    });
  });

  describe('when routing to a matched route with pushState and query params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/example?james=true&hungry=3');
      this.callback = function() {};
      this.router.route('example', this.callback);
      Backbone.history.start({pushState: true});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example?james=true&hungry=3');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params', function() {
      expect(this.routeData.query).to.deep.equal({james: 'true', hungry: '3'});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('james=true&hungry=3');
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route without pushState and query params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#example?james=true&hungry=3');
      this.callback = function() {};
      this.router.route('example', this.callback);
      Backbone.history.start({pushState: false});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example?james=true&hungry=3');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params', function() {
      expect(this.routeData.query).to.deep.equal({james: 'true', hungry: '3'});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('james=true&hungry=3');
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route with pushState and query params with an array-like syntax', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/example?letters=a&letters=b&letters=c');
      this.callback = function() {};
      this.router.route('example', this.callback);
      Backbone.history.start({pushState: true});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example?letters=a&letters=b&letters=c');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params, not parsing the array-like syntax', function() {
      expect(this.routeData.query).to.deep.equal({letters: ['a', 'b', 'c']});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('letters=a&letters=b&letters=c');
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route without pushState and query params with an array-like syntax', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#example?letters=a&letters=b&letters=c');
      this.callback = function() {};
      this.router.route('example', this.callback);
      Backbone.history.start({pushState: false});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.callback);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('example');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example?letters=a&letters=b&letters=c');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params, not parsing the array-like syntax', function() {
      expect(this.routeData.query).to.deep.equal({letters: ['a', 'b', 'c']});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('letters=a&letters=b&letters=c');
    });

    it('should pass an empty object for named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched route with pushState and named params with a splat', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/3/deeply/nested/splat');
      this.routeObj = {};
      this.router.route(':id/*splat', this.routeObj);
      Backbone.history.start({pushState: true});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.routeObj);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal(':id/*splat');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('3/deeply/nested/splat');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass the parsed named param', function() {
      expect(this.routeData.params).to.deep.equal({id: '3', splat: 'deeply/nested/splat'});
    });
  });

  describe('when routing to a matched route without pushState and named params with a splat', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#3/deeply/nested/splat');
      this.routeObj = {};
      this.router.route(':id/*splat', this.routeObj);
      Backbone.history.start({pushState: false});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.routeObj);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal(':id/*splat');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('3/deeply/nested/splat');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass the parsed named param', function() {
      expect(this.routeData.params).to.deep.equal({id: '3', splat: 'deeply/nested/splat'});
    });
  });

  describe('when routing to a matched route with pushState and a splat with query params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/deeply/nested/splat?name=james');
      this.router.route('*splat', false);
      Backbone.history.start({pushState: true});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(false);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('*splat');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('deeply/nested/splat?name=james');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params', function() {
      expect(this.routeData.query).to.deep.equal({name: 'james'});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('name=james');
    });

    it('should pass an empty object for the named params', function() {
      expect(this.routeData.params).to.deep.equal({splat: 'deeply/nested/splat'});
    });
  });

  describe('when routing to a matched route without pushState and a splat with query params', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#deeply/nested/splat?name=james');
      this.router.route('*splat', false);
      Backbone.history.start({pushState: false});
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(false);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the original matched Route', function() {
      expect(this.routeData.originalRoute).to.equal('*splat');
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('deeply/nested/splat?name=james');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass the parsed query params', function() {
      expect(this.routeData.query).to.deep.equal({name: 'james'});
    });

    it('should pass the original query string', function() {
      expect(this.routeData.queryString).to.equal('name=james');
    });

    it('should pass an empty object for the named params', function() {
      expect(this.routeData.params).to.deep.equal({splat: 'deeply/nested/splat'});
    });
  });

  describe('when routing to a matched Regex route with pushState', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com/example');
      this.routeObj = {};
      this.router.route(/^example$/, this.routeObj);
      Backbone.history.start({pushState: true});
    });

    it('should not include originalRoute in the options', function() {
      expect(this.routeData).to.not.include.keys('originalRoute');
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.routeObj);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass empty named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });

  describe('when routing to a matched Regex route without pushState', function() {
    beforeEach(function() {
      Backbone.history.location = new this.Location('http://example.com#example');
      this.routeObj = {};
      this.router.route(/^example$/, this.routeObj);
      Backbone.history.start({pushState: false});
    });

    it('should not include originalRoute in the options', function() {
      expect(this.routeData).to.not.include.keys('originalRoute');
    });

    it('should trigger onNavigate', function() {
      expect(this.router.onNavigate).to.have.been.calledOnce;
    });

    it('should pass the object that was linked with the route', function() {
      expect(this.routeData.linked).to.deep.equal(this.routeObj);
    });

    it('should pass the Router instance', function() {
      expect(this.routeData.router).to.equal(this.router);
    });

    it('should pass the current URI fragment', function() {
      expect(this.routeData.uriFragment).to.equal('example');
    });

    it('should pass a Regular expression as the route', function() {
      expect(this.routeData.route).to.be.instanceOf(RegExp);
    });

    it('should pass an empty object for query params', function() {
      expect(this.routeData.query).to.deep.equal({});
    });

    it('should pass undefined for queryString', function() {
      expect(this.routeData.queryString).to.equal(undefined);
    });

    it('should pass empty named params', function() {
      expect(this.routeData.params).to.deep.equal({});
    });
  });
});
