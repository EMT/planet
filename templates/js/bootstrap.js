
var theTeam = [
	{text:'Loz',value:'Loz'},
	{text:'Ed',value:'Ed'},
	{text:'Sadie',value:'Sadie'},
	{text:'Andy',value:'Andy'},
	{text:'Eve',value:'Eve'},
	{text:'Harry',value:'Harry'}
];

var theProjects = [
	{text:'Plau',value:'Plau'},
	{text:'Substance Site',value:'Substance Site'},
	{text:'Planet',value:'Planet'},
	{text:'Sustrans',value:'Sustrans'},
	{text:'Plan.Do',value:'Plan.Do'},
	{text:'Scriberia',value:'Scriberia'}
];

// var GenericTasks = [
// 	{	
// 		"project":"Substance",
// 		"description":"Do a flip! Fry, you can't just sit here in the dark listening to classical music. I could if you hadn't turned on the light and shut off my stereo. I've been there. My folks were always on me to groom myself and wear underpants. What am I, the pope?",
// 		"time":"20:32",
// 		"date":"Last Week",
// 		"completed":true,
// 		"subtasks": [
// 			{ "task":"Stop using planet as my personal todo list" },
// 			{ "task":"Pick up my washing" },
// 			{ "task":"Do the dishes" }
// 		],
// 		"team": [
// 			{ "user":"Harry" },
// 			{ "user":"Loz" },
// 			{ "user":"Eve" }
// 		]
// 	},
// 	{	
// 		"project":"Substance",
// 		"description":"Do a flip! Fry, you can't just sit here in the dark listening to classical music. I could if you hadn't turned on the light and shut off my stereo. I've been there. My folks were always on me to groom myself and wear underpants. What am I, the pope?",
// 		"time":"20:32",
// 		"date":"Last Week",
// 		"completed":false,
// 		"subtasks": [],
// 		"team": [
// 			{ "user":"Andy" },
// 			{ "user":"Ed" }
// 		]
// 	},
// 	{	
// 		"project":"Substance",
// 		"description":"Do a flip! Fry, you can't just sit here in the dark listening to classical music. I could if you hadn't turned on the light and shut off my stereo. I've been there. My folks were always on me to groom myself and wear underpants. What am I, the pope?",
// 		"time":"20:32",
// 		"date":"Last Week",
// 		"completed":false,
// 		"subtasks": [
// 			{ "task":"Stop using planet as my personal todo list" },
// 			{ "task":"Pick up my washing" },
// 			{ "task":"Do the dishes" }
// 		],
// 		"team": [
// 			{ "user":"Eve" },
// 			{ "user":"Sadie" }
// 		]
// 	},
// 	{	
// 		"project":"Substance",
// 		"description":"Do a flip! Fry, you can't just sit here in the dark listening to classical music. I could if you hadn't turned on the light and shut off my stereo. I've been there. My folks were always on me to groom myself and wear underpants. What am I, the pope?",
// 		"time":"20:32",
// 		"date":"Last Week",
// 		"completed":true,
// 		"subtasks": [
// 			{ "task":"Stop using planet as my personal todo list" },
// 			{ "task":"Pick up my washing" },
// 			{ "task":"Do the dishes" }
// 		],
// 		"team": [
// 			{ "user":"Harry" },
// 			{ "user":"Loz" },
// 			{ "user":"Eve" }
// 		]
// 	}
// ];

rivets.binders.addclass = function(el, value) {
  if(el.addedClass) {
    $(el).removeClass(el.addedClass)
    delete el.addedClass
  }

  if(value) {
    $(el).addClass(value)
    el.addedClass = value
  }
}

rivets.binders.listdata = function (el, value) {
	var thedata = [];

	for (index = 0; index < value.length; ++index) {
		thedata.push(value[index].user);
	}

	$(el).data("currentUsers",thedata);
}


	// var testObject = GenericTasks;

	// // // Put the object into storage
	// localStorage.setItem('testObject', JSON.stringify(testObject));

	// Retrieve the object from storage
	var retrievedObject = localStorage.getItem('testObject');
	var retrievedData =  JSON.parse(retrievedObject);
	console.log('retrievedObject: ', JSON.parse(retrievedObject));






$(document).ready(function(){



	// On load lets grab the "Overview" task list.
	animateLoad("global.html");

	// get the DOM elements
	var userList = document.getElementById('teamList');
	var projectList = document.getElementById('projectList');

	// pass the data to the DOM element
	rivets.bind(userList,{users:theTeam});
	rivets.bind(projectList,{projects:theProjects});

	// Initialise autogrow on the new project modal description input.
	$('.task-description-input').autoGrow();
	// Initialise the select area on the new project modal.
	$('.names-input').selectize({
		options: theTeam // use theTeam data source
	});



$('.js-load').on('submit', '.add-task-block form', function(e) {
	e.preventDefault();


	var currentDate = new Date(); 
	var currentTime = currentDate.getHours() + ":"  + currentDate.getMinutes();

	var descriptionText = $(this).find('.task-description-input').val();
	var selectedNames = $(this).find('.js-names-input').val();
	var selectedProject = $(this).find('.js-project-input').val();

	var currentSubTasks = [];
	var subTaskObj = {};

	$(this).find('.subtask-list li input').each(function(){
		subTaskObj = {"task":$(this).val()};
		if ( $(this).val() != '' ) {
			currentSubTasks.push(subTaskObj);
		}
	});	

	var currentNames = [];
	var namesObj = {};

	if ( selectedNames != null ) {
		$.each(selectedNames, function( index, value ) {
		   namesObj = {"user":value};
		   currentNames.push(namesObj);
		});
	}

	var newTask = [
		{	
			"project": selectedProject,
			"description": descriptionText,
			"time": currentTime,
			"date":"Last Week",
			"completed": false,
			"subtasks": currentSubTasks,
			"team": currentNames
		}
	];

	retrievedData.push(newTask[0]);

	localStorage.setItem('testObject', JSON.stringify(retrievedData));




	$(".js-load .task-names .js-selector").each(function(){
	    $(this).selectize({
	    		options: theTeam
	    	});
	    	var selectize = $(this)[0].selectize;
	    	selectize.setValue($(this).data('currentUsers'));
	    });
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

	// Replace the current content of js-load area with new project task list.
	$('.js-add-project').on('click', function(e){
		e.preventDefault();

		$('.new-project-overlay').addClass('project-added');

		var projectTitle = $('.project-title-input').val();

		var newProject = {};
		newProject = {text: projectTitle,value: projectTitle};
		theProjects.push(newProject);


		animateLoad("personal.html",'none');
		// This would wait until ajax complete (adding in the new project and loading the page).
		setTimeout(function(){
			$('.new-project-overlay').removeClass('visible');
			$('.new-project-overlay').removeClass('project-added');
			$('.content-area').removeClass('overlay-on');
		},3000);

	});

	
	// Subtask List (Needs cleaning up).

	$(document).on('keydown', '.subtask-input', function(e){
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

	// Basic filtering of each list to only show your personal tasks, this persists across projects.

	$('.personal-filter').on('click', function(){
		$('.js-load').toggleClass('personal');
	});

	$('.global-filter').on('click', function(){
		$('.js-load').removeClass('personal');
	});

	// Load in the overview list on clicking the planet logo (simulates returning to homepage).

	$('.planet-logo').on('click', function(){
		animateLoad("global.html");
	});

	// Load in lists in the ajax area that have the class .ajaxed (used in the sidebar).
	$('.ajaxed').on('click', function(e){
		e.preventDefault();
		loadUrl = $(this).attr('href');
		animateLoad(loadUrl);
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
		$(this).find('.task-description').cssAnimateAuto('height 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)');
		$(this).cssAnimateAuto('height 0.4s cubic-bezier(0.215, 0.610, 0.355, 1.000)');

		// Remove the is-opened class applied by cssAnimateAuto slightly early to fix some overflow issues.

		if ($(this).hasClass('is-opened')) {
			$(this).removeClass('is-opened');
		}

		// Check if the task has any subtasks, if so add a list icon on close.

		hasList($(this));
	});

	// Prevent the task list items from closing when you click on the form inputs.

	$('.js-load').on('click', '.toggle, .subtask-input, .selectize-input, .is-opened .task-description, .is-opened .task-description-input', function(e) {
		e.stopPropagation();

		if ( $(this).hasClass('toggle') ) {
			$(this).toggleClass('done');		
		}
	});

	// Slide out the mobile menu.

	$('.js-menu-toggle').on('click', function(){
		$('.side-nav').toggleClass('active');
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
		  	// Swap out the .js-load html with the new ajaxed content and then initialise the plugins for the form fields.
		    $(".js-load").html( html );

			// get the DOM elements
			var taskList = document.getElementById('taskList');

			// pass the data to the DOM element
			rivets.bind(taskList,{tasks:retrievedData});


		    $('.js-load .task-description-input').autoGrow();

		    $('.js-load .basic-task').each(function(){
		    	hasList($(this));
		    });

		    $(".js-load .task-names .js-selector").each(function(){
		    	$(this).selectize({
		    		options: theTeam
		    	});
		    	var selectize = $(this)[0].selectize;
		    	selectize.setValue($(this).data('currentUsers'));
		    });


		    $(".js-load .task-project .js-selector").each(function(){
		    	$(this).selectize({
		    		options: theProjects
		    	});
		    });
		    // Slight delay before removing content-hidden class to prevent popin when plugins are activated.
		    setTimeout(function(){
		    	$(".js-load").removeClass('content-hidden');
		    },50);
		  });
	},2000);
}

