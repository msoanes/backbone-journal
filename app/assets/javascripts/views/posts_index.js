JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  events: {
    'click button.new-post': 'newPost'
  },

  initialize: function() {
    this.listenTo(this.collection, 'remove reset add change:title', this.render);
  },

  render: function () {
    var view = this;
    var index = view.template();
    view.$el.html(index);
    view.collection.each(function (post) {
      var itemView = new JournalApp.Views.PostsIndexItem({ model: post });
      view.$('ul.posts-index').append(itemView.render().$el);
    });
    return view;
  },

  newPost: function() {
    Backbone.history.navigate(this.collection.url + '/new', {trigger: true});
  }
});
