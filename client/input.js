Template.task.events({
    'click .js-task-status': function(event){
        Meteor.call('updateStatus', this.id, ! this.done);
    },
    'keydown .js-task-description-input': debounce(function(event){
        var updatedDescription = event.target.value
        Meteor.call('updateTaskDescription', this.id, updatedDescription);
    }, 500),
    'click .js-remove-task': function(event) {
        Meteor.call('removeTask', this.id);
    }
});

Template.addTask.events({
    'click .js-add-task': function(e){
        var inputVal = $('.js-add-task-block textarea').val();
        if(!!inputVal) {
            e.stopPropagation();
            Meteor.call('newTask', {
                text: $('.js-add-task-block textarea').val(),
                channel: Session.get('channel')
            });

            $('.js-add-task-block textarea').val("");
            return false;
        }    
    }
});

Template.newProject.events({
    'click .js-add-project': function(e){
        var inputVal = $('.project-title-input').val();
        if(!!inputVal) {
            e.stopPropagation();
            Meteor.call('newChannel', {
                name: $('.project-title-input').val()
            });

            $('.project-title-input').val("");
            $('.content-area').toggleClass('overlay-on');
            $('.new-project-overlay').toggleClass('visible');
            return false;
        }    
    }
})

Template.listings.events({
  'keypress input': function(e) {
    var inputVal = $('.side-input-box_text').val();
    if(!!inputVal) {
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode == 13) {
        e.stopPropagation();
		Meteor.call('newChannel', {
			name: $('.side-input-box_text').val()
		});

		$('.message-history').scrollTop($(document).height());

        $('.side-input-box_text').val("");
        return false;
      }    
    }
  },
  'click .js-add-project-link': function(e) {
    e.preventDefault();
    $('.content-area').toggleClass('overlay-on');
    $('.new-project-overlay').toggleClass('visible');
  }
});

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}