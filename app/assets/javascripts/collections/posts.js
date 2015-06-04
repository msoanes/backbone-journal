JournalApp.Collections.Posts = Backbone.Collection.extend({
  model: JournalApp.Models.Post,
  url: 'posts',

  getOrFetch: function(id, callback) {
    var instance = this.get(id);
    var collection = this;
    instance = instance || new this.model({ id: id });
    instance.fetch({
      success: function() {
        collection.add(instance);
        callback && callback();
      }
    });
    return instance;
  }
});
