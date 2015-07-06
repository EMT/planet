Meteor.methods({
  newTask: function (task) {
    task.timestamp = Date.now();
    task.user = Meteor.userId();
    Tasks.insert(task);
  },
  newChannel: function (channel) {
  	var newChannel = Channels.findOne(channel);
  	if(typeof newChannel == 'undefined'){
	  Channels.insert(channel);
    } else{
      console.log('that item exists already.');
      throw new Meteor.Error(403, channel.name + " already exists!");
    }
  },
  updateStatus: function(taskId, setStatus) {
  	var task = Messages.findOne(taskId);
  	console.log(task);
  	Messages.update(task, {$set: {done: setStatus}});
  },
  updateTaskDescription: function(taskId, updatedDescription) {
  	var task = Messages.findOne(taskId);
  	Messages.update(task, {$set: {text: updatedDescription}});
  },
  removeTask: function(taskId) {
  	Messages.remove(taskId);
  }
})