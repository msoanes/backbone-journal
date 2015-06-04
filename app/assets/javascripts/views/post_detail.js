JournalApp.Views.PostDetail = Backbone.View.extend({
  template: JST['posts/show'],

  events: {
    'dblclick .title, .body': 'editProperty',
    'blur .title, .body' : 'saveProperty',
    'click button.post-edit': 'editPost',
    'click .index-link': 'backToIndex',
    'click button.delete' : 'delete',
  },

  render: function(){
    var view = this.template({post: this.model});
    this.$el.html(view);
    return this;
  },

  backToIndex: function(){
    Backbone.history.navigate('/', {
      trigger: true
    });
  },

  editPost: function () {
    Backbone.history.navigate(
      this.model.url() + '/edit', { trigger: true }
    );
  },

  delete: function () {
    this.model.destroy();
    this.backToIndex();
  },

  editProperty: function (event){
    var propName = $(event.currentTarget).attr('class');
    var input = $('<input>').addClass(propName);
    input.
      attr('type', 'text').
      attr('name', 'post[' + propName + ']').
      attr('value', this.model.escape(propName));

    $(event.target).html(input);
    input.focus();
  },

  saveProperty: function (){
    var propName = $(event.target).attr('class');
    var $input = $(event.target);
    var options = {};
    options[propName] = $input.val();
    this.model.save(options, {
      success: function () {
        $input.parent().text(this.model.escape(propName));
      }.bind(this),
    });
  },
});
