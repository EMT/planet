
var availableId = 0;
var lazyValidation = false;	

	$('.js-load').on('submit', '.add-task-block form', function(e) {
		e.preventDefault();

		var currentSubTasks = [];
		var currentNames = [];
		var currentDate = new Date().getTime() / 1000;
		var descriptionText = $(this).find('.task-description-input').val();
		var selectedNames = $(this).find($('.js-names-input')[1]).val();
		var selectedProject = $(this).find('.js-project-input').val();


		$(this).find('.subtask-list li input').each(function(){
			var subTaskObj = {"task":$(this).val()};
			if ( $(this).val() != '' ) {
				currentSubTasks.push(subTaskObj);
			}
		});	

		// console.log($(this).find($('div.js-names-input')[1]).val());

		console.log(selectedNames);

		if ( selectedNames != [] ) {
			$.each(selectedNames, function( index, value ) {
			   var namesObj = value;
			   currentNames.push(namesObj);
			});
		}

		var newTask = {
			id: availableId,
	        done: false,
	        project: selectedProject,
	        date: currentDate,
	        subtasks: currentSubTasks,
	        team: selectedNames,
	        content: descriptionText
		}

		console.log(currentSubTasks);
		console.log(descriptionText);
		console.log(selectedProject);
		console.log(currentNames);


		if ( descriptionText !== '' && selectedNames !== [] && selectedProject !== '') {
			lazyValidation = true;
		} else {
			lazyValidation = false;
			$(this).parent().addClass('lazy-val-error');
		}

		if ( lazyValidation == true ) {
			console.log(newTask);
			pushTask(newTask);
			$(this).parent().removeClass('lazy-val-error');
		} else {
			console.log('VAL FAIL');
		}

	});


	$('.js-add-project').on('click', function(e){
		e.preventDefault();

		$('.new-project-overlay').addClass('project-added');

		var projectTitle = $('.project-title-input').val();

		var newProject = {};
		newProject = {text: projectTitle,value: projectTitle};
		theProjects.push(newProject);


		// animateLoad("personal.html",'none');
		// This would wait until ajax complete (adding in the new project and loading the page).
		setTimeout(function(){
			$('.new-project-overlay').removeClass('visible');
			$('.new-project-overlay').removeClass('project-added');
			$('.content-area').removeClass('overlay-on');
		},3000);

	});

	// This is the old implimentation of the subtasks code, need to fix how new projects are added and then this can be removed.
	$(document).on('keydown', '.add-task-block .subtask-input', function(e){
		var code = e.keyCode || e.which;
		if ( code == 13 ) {
			e.preventDefault();
			$(this).parents('.subtask-list').append('<li class="subtask"><input type="text" class="subtask-input" placeholder="Add Subtask"></li>');
			console.log($(this).parent().last());
			$(this).parents('.subtask-list').children().last().children('input').focus();
		} else if ( code == 8  && !$(this).val() && $(this).parents('.subtask-list').children().length > 1) {
			e.preventDefault();
			$(this).parents('.subtask-list').children().last().prev("li").children('input').focus();
			$(this).parent().remove();
		}
	});



$(document).ready(function(){


	// // On load lets grab the "Overview" task list.
	animateLoad();


	// Initialise autogrow on the new project modal description input.
	autosize($('.js-task-description-input'));
	// Initialise the select area on the new project modal.

	// Make this work on the add-project input as well.
	$('.add-task-block .names-input').selectize({
		options: theData.users // use theTeam data source
	});

	// Toggle for the search overlay.

	$('.search-icon').on('click',function(){
		$('.search-icon').toggleClass('expanded');
		$('.search-overlay').toggleClass('visible');
		$('.search input[type="text"]').focus();

		if ( !$('.content-area').hasClass('.overlay-on') ) {
			$('.content-area').addClass('overlay-on');
		} else {
			setTimeout(function(){
				$('.content-area').removeClass('overlay-on');
			},500)
		}
	});

	// Toggle for the new project overlay.

	$('.add-project-link, .close-modal').on('click',function(e){
		e.preventDefault();
		$('.content-area').toggleClass('overlay-on');
		$('.new-project-overlay').toggleClass('visible');
	});

	// Close modal via escape key if its open.

	$(document).on('keydown', function(e){
		if (e.keyCode == 27 ) {
			if ($('.new-project-overlay').hasClass('visible')) {
				$('.close-modal').click();
			}
		}
	});

	// Basic filtering of each list to only show your personal tasks, this persists across projects.
	// This can be done with vue.js if we want to or keep it css based.

	$('.personal-filter').on('click', function(){
		$('.js-load').toggleClass('personal');
	});

	$('.global-filter').on('click', function(){
		$('.js-load').removeClass('personal');
	});


	// Temp code to animate out the login sections of the login page, this needs more attention as it was mainly for demonstration purposes.
	$('.login-area input').on('keydown', function(e){

		var code = e.keyCode || e.which;
		if ( code == 13 ) {
			$('.mr-planet-svg-wrapper').toggleClass('away');
			$('.login-area input').addClass('fade-out-down');
			$('.login-area h2').addClass('fade-out-down');

			setTimeout(function(){
				$('body').addClass('fade-out');
			},2000);

			setTimeout(function(){
				window.location.href = 'http://' + window.location.host;
			},2350);
		}
	});

	// Animate the basic tasks to full height on click revealing additional information.

	$('.js-load').on('click', '.basic-task', function() {

		// Old easing -> cubic-bezier(0.215, 0.610, 0.355, 1.000)
		// $(this).find('.task-description').cssAnimateAuto('height 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)');
		$(this).cssAnimateAuto('height 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)');

		// Remove the is-opened class applied by cssAnimateAuto slightly early to fix some overflow issues.
		var descriptionWrapper = $(this).find('.task-description-wrapper');

		var maxHeight = $(this).find('.task-description').innerHeight();
		descriptionWrapper.css('maxHeight',maxHeight);

		descriptionWrapper.removeClass('hidden-text');
		descriptionWrapper.addClass('animated-height');
		setTimeout(function(){
			descriptionWrapper.removeClass('animated-height');
		},400);


		if ($(this).hasClass('is-opened')) {
			descriptionWrapper.addClass('hidden-text');
			descriptionWrapper.addClass('animated-height');
			setTimeout(function(){
				descriptionWrapper.removeClass('animated-height');
			},400);

			$(this).removeClass('is-opened');
		}

		// Check if the task has any subtasks, if so add a list icon on close.

		hasList($(this));
	});

	$('.task-description').on("input", function(){
		var maxHeight = $(this).innerHeight();
		$(this).parent().css('maxHeight',maxHeight);
	});

	// Prevent the task list items from closing when you click on the form inputs.

	$('.js-load').on('click', '.js-add-task, .toggle, .subtask-input, .selectize-input, .is-opened .task-description, .is-opened .task-description-input', function(e) {
		e.stopPropagation();
	});

	 $('.side-nav').perfectScrollbar();


});

var hasList = function(item) {
	if ( item.find('.subtask input').val() != "" && !item.hasClass('add-task-block')) {
		item.addClass('list');
	} else {
		item.removeClass('list');
	}
}


var animateLoad = function(ajaxUrl,loader) {
	// Hide the current content (fade-out-down)
	$('.js-load').addClass('content-hidden');

	setTimeout(function(){
		$('.content-area').scrollTop(0);
	},400);

	// Check if we want to show the loader.
	if ( loader != 'none') {
		$('.js-load').append('<div class="loader"><svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke="#222A33" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');
	}

	// This timeout is just to fake a long ajax load time during testing.
	setTimeout(function(){
		$.ajax({
		  url: ajaxUrl,
		  cache: false
		})
		  .done(function( html ) {

		    $('.js-load .basic-task').each(function(){
		    	hasList($(this));
		    	// Swap out autogrow with this script - http://www.jacklmoore.com/autosize/
		    	autosize($(this).find('.task-description-input'));
		    });

		    // $(".js-load .task-names select.js-selector#test").each(function(e){
		    // 	var test = $(this);

		    // 	// $(test).each(function(e){
		    // 	// 	console.log($(this));
		    // 	// });
		    // 	console.log( test  + ' ----> ' + $(this).data('theusers'));
		    // 	$(this).selectize({
		    // 		options: theData.users,
		    // 		onChange: function(value) {
		    //            $(this).data('theusers',value);
		    //            console.log($(this).data('theusers'));
			   //      }
		    // 	});
		    // 	var selectize = $(this)[0].selectize;
		    // 	// selectize.setValue('');
		    // });

		  	// http://vuejs.org/guide/transitions.html
		  	// Take a look at transitions and intialise the plugins on each task seperately ?


		    $(".js-load .task-project .js-selector").each(function(){
		    	$(this).selectize({
		    		options: theData.projects
		    	});
		    });

		    $('.loader').remove();
		    // Slight delay before removing content-hidden class to prevent popin when plugins are activated.
		    setTimeout(function(){
		    	$(".js-load").removeClass('content-hidden');
		    },50);
		  });
	},2000);
}

