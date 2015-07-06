Meteor.publish('tasks', function (channel) {
    return Tasks.find({channel: channel});
});


Meteor.publish('channels', function () {
    return Channels.find();
});

Meteor.publish('allTasks', function (channel) {
	// Make this return no information, just the count.
    return Tasks.find();
});


Meteor.publish("allUsernames", function () {
  return Meteor.users.find({}, {fields: {
    "username": 1,
    "services.github.username": 1,
    "profile.name": 1
  }});
});

