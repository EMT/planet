Meteor.startup(function() {
  Factory.define('task', Tasks, {
    text: function() {
        return Fake.sentence();
    },
    user: Meteor.users.findOne()._id,
    timestamp: Date.now(),
    channel: 'overview',
    done: false
  });

  // Add this if you want to remove all Tasks before seeding
  Tasks.remove({});

  if (Tasks.find({}).count() === 0) {
    _(10).times(function(n) {
      Factory.create('task');
    });
  }

  Channels.remove({});
  Channels.insert({
    name: "overview"
  });
  Channels.insert({
    name: "project"
  });
});
