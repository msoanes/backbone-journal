JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    '': 'root',
    'posts/new': 'postNew',
    'posts/:id/edit': 'postEdit',
    'posts/:id': 'postDetail'
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.posts = options.posts;
  },

  root: function () {
    var router = this;
    router._currentView && router._currentView.remove();
    router.$rootEl.empty();
    router._currentEl = null;
  },

  postDetail: function (id) {
    this._genericDetail(id, JournalApp.Views.PostDetail);
  },

  postEdit: function (id) {
    this._genericDetail(id, JournalApp.Views.PostForm);
  },

  postNew: function () {
    var router = this;
    router._currentView && router._currentView.remove();
    var post = new JournalApp.Models.Post();
    router._currentView = new JournalApp.Views.PostForm({ model: post });
    router.$rootEl.html(router._currentView.render().$el);
  },

  _genericDetail: function (id, viewClass) {
    var router = this;
    router._currentView && router._currentView.remove();
    var post = router.posts.getOrFetch(id, function (){
      router._currentView = new viewClass({ model: post });
      router.$rootEl.html(router._currentView.render().$el);
    });
  }
});
