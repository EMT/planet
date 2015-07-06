Template.tasks.helpers({
    tasks: function () {
        return Tasks.find({channel: Session.get('channel')});
    }
});


Template.listings.helpers({
    channels: function () {
        return Channels.find();
    },
    channelCount: function() {
    	return Channels.find({}).count();
    }
});



Template.registerHelper('currentChannel', function () {
	return Session.get('channel');
});

Template.registerHelper('currentUser', function () {
	return Session.get('user');
});


Template.registerHelper("timestampToTime", function (timestamp) {
	var date = new Date(timestamp);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Template.registerHelper("usernameFromId", function (userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (typeof user === "undefined") {
		return "Anonymous";
	}
	if (typeof user.services.github !== "undefined") {
		return user.services.github.username;
	}

	if (typeof user.profile !== "undefined") {
		return user.profile.name;
	}
	return user.username;
});


Template.registerHelper("idFromUsername", function (userId) {
	var user = Meteor.users.findOne({_id: userId});
	if (typeof user === "undefined") {
		return "Anonymous";
	}
	if (typeof user.services.github !== "undefined") {
		return user.services.github.username;
	}

	if (typeof user.profile !== "undefined") {
		return user.profile.name;
	}
	return user.username;
});

Template.registerHelper("taskStatus", function (status) {
	if ( status == true ) {
		return 'done';
	} else {
		return '';
	}
});


Template.channel.helpers({
    active: function () {
        if (Session.get('channel') === this.name) {
            return "active";
        } else {
            return "";
        }
    },
    tasksCount: function() {
		return Tasks.find({channel: this.name}).count();
    }
});