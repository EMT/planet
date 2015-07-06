
Meteor.subscribe('channels');
Meteor.subscribe('channelCount');
Meteor.subscribe('allTasks')

Deps.autorun(function() {
  if (Meteor.user()) {
    Meteor.subscribe('allUsernames');
  }
});

Template.tasks.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('tasks', Session.get('channel'));
  });
});