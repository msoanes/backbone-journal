JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  events: {
    'click .index-link': 'backToIndex',
    'click .save': 'save',
    'click .cancel': 'cancel'
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

  save: function(event){
    event.preventDefault();
    var that = this;
    var form = that.$('form').serializeJSON()['post'];
    $(event.currentTarget).prop('disabled', true);
    that.model.save(form, {
      success: function(){
        Backbone.history.navigate(that.model.url(), {trigger: true});
      },
      error: function(model, response){
        this.$('.errors').empty();
        for (var error of response.responseJSON) {
          this.$('.errors').append($('<li>').text(error));
        }
      },
      wait: true
    });
  },

  cancel: function(event) {
    event.preventDefault();
    window.history.back();
  }
});
