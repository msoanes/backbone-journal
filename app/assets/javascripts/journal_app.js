window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var posts = new JournalApp.Collections.Posts();
    var routerOptions = {
      $rootEl: $('.content'),
      posts: posts
    };
    posts.fetch({
      success: function () {
        var router = new JournalApp.Routers.PostsRouter(routerOptions);
        Backbone.history.start();
        var sidebar = new JournalApp.Views.PostsIndex({collection: posts});
        $('.sidebar').html(sidebar.render().$el);
      }
    });
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
