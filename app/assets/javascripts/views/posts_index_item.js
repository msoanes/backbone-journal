JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST['posts/index_item'],

  tagName: 'li',

  events: {
    'click button.delete': 'deletePost',
    'click button.post-edit': 'editPost',
    'click a.post-detail-link': 'viewPost'
  },

  // initialize: function (){
  //   this.listenTo(this.model, 'change', this.render);
  // },

  render: function () {
    var indexItem = this.template({ post: this.model });
    this.$el.html(indexItem);
    return this;
  },

  deletePost: function(event) {
    this.model.destroy();
  },

  editPost: function(event) {
    Backbone.history.navigate(
      this.model.url() + '/edit', { trigger: true}
    );
  },

  viewPost: function(event) {
    Backbone.history.navigate(
      this.model.url(), { trigger: true}
    );
  }
});
