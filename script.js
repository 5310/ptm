// Default filter-states.		
// Override for persistence.													//TODO: Not yet persistent.
var filters = {
	'done': false,
	'late': true,
	'free': true,
	'next': true,
	'now':	true
};


// The ready function.
$(document).ready(
	function() {
		
		// Sets filters by state.
		setFiltersByState();	
		
		// Sets filter availability by available tasks.
		setFiltersAvailability();			
		
		
		// Handlers for the specific filter toggles.
		
		$(".filter#done").not('.disabled').on("click", function(event){
			
			// Toggle visibility of all tasks with class 'done'.
			$('.task.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#done").toggleClass('on');
			
			// Toggle filter-state.
			filters['done'] = !filters['done'];
			
			// Displayes empty-message if required.
			showEmptyMessage();
			
			// Sets filter availability by available tasks.
			setFiltersAvailability();			
			
		});
		
		// Handler for the 'late' filter.
		$(".filter#late").not('.disabled').on("click", function(event){
			
			// Toggle visibility of all tasks with class 'late' but not 'done'.
			$('.task.late').not('.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#late").toggleClass('on');
			
			// Toggle filter-state.
			filters['late'] = !filters['late'];
			
			// Displayes empty-message if required.
			showEmptyMessage();
			
			// Sets filter availability by available tasks.
			setFiltersAvailability();			
			
		});
		
		// Handler for the 'free' filter.
		$(".filter#free").not('.disabled').on("click", function(event){
						
			// Toggle visibility of all tasks with class 'free' but not 'done' or 'late'.
			$('.task.free').not('.done').not('.late').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#free").toggleClass('on');
			
			// Toggle filter-state.
			filters['free'] = !filters['free'];
			
			// Displayes empty-message if required.
			showEmptyMessage();
			
			// Sets filter availability by available tasks.
			setFiltersAvailability();			
			
		});
		
		// Handler for the 'next' filter.
		$(".filter#next").not('.disabled').on("click", function(event){
						
			// Toggle visibility of all tasks with class 'next' but not 'done', 'late', and 'free'.
			$('.task.next').not('.done').not('.late').not('.free').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#next").toggleClass('on');
			
			// Toggle filter-state.
			filters['next'] = !filters['next'];
			
			// Displayes empty-message if required.
			showEmptyMessage();
			
			// Sets filter availability by available tasks.
			setFiltersAvailability();			
			
		});
		
		// Handler for the 'now' filter.
		$(".filter#now").not('.disabled').on("click", function(event){
						
			// Toggle visibility of all tasks with class 'now' but not 'done', 'late', 'free', and 'next'.
			$('.task.now').not('next').not('.done').not('.late').not('.free').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#now").toggleClass('on');
			
			// Toggle filter-state.
			filters['now'] = !filters['now'];
			
			// Displayes empty-message if required.
			showEmptyMessage();
			
			// Sets filter availability by available tasks.
			setFiltersAvailability();			
			
		});

	}
);

// Sets filters to the state in `filters`.
var setFiltersByState = function() {
		
	// For the 'done' filter.
	if ( filters['done'] ) {
		$(".filter#done").addClass('on');
		$('.task.done').show();
	} else {
		$(".filter#done").removeClass('on');
		$('.task.done').hide();
	}
	
	// For the 'late' filter.	
	if ( filters['late'] ) {
		$(".filter#late").addClass('on');
		$('.task.late').not('.done').show();
	} else {
		$(".filter#late").removeClass('on');
		$('.task.late').not('.done').hide();
	}
	
	// For the 'free' filter.	
	if ( filters['free'] ) {
		$(".filter#free").addClass('on');
		$('.task.free').not('.done').not('.late').show();
	} else {
		$(".filter#free").removeClass('on');
		$('.task.free').not('.done').not('.late').hide();
	}
	
	// For the 'next' filter.	
	if ( filters['next'] ) {
		$(".filter#next").addClass('on');
		$('.task.next').not('.done').not('.late').not('.free').show(100);
	} else {
		$(".filter#next").removeClass('on');
		$('.task.next').not('.done').not('.late').not('.free').hide(100);
	}
	
	// For the 'now' filter.
	if ( filters['now'] ) {
		$(".filter#now").addClass('on');
		$('.task.now').not('.done').not('.late').not('.free').not('next').show(100);
	} else {
		$(".filter#now").removeClass('on');
		$('.task.now').not('.done').not('.late').not('.free').not('next').hide(100);
	}
	
	// For the empty-message.
	$('#emptymessage').hide();
	showEmptyMessage();
	
};

// Enable or disable filters depending on if there are relevant tasks available.
var setFiltersAvailability = function() {
	
	// Enable or disable filters.
	
	if ( $('.task.done').size() > 0 )
		$(".filter#done").removeClass('disabled');
	else
		$(".filter#done").addClass('disabled');
		
	if ( $('.task.late').not('.done').size() > 0 )
		$(".filter#late").removeClass('disabled');
	else
		$(".filter#late").addClass('disabled');
		
	if ( $('.task.free').not('.done').not('.late').size() > 0 )
		$(".filter#free").removeClass('disabled');
	else
		$(".filter#free").addClass('disabled');
		
	if ( $('.task.next').not('.done').not('.late').not('.free').size() > 0 )
		$(".filter#next").removeClass('disabled');
	else
		$(".filter#next").addClass('disabled');
		
	if ( $('.task.now').not('next').not('.done').not('.late').not('.free').size() > 0 )
		$(".filter#now").removeClass('disabled');
	else
		$(".filter#now").addClass('disabled');
	
};

// Shows the empty-list message.
var showEmptyMessage = function() {
	
	// Fancy list of messages to randomly choose from.
	var messages = [
		"Looks like you're done! Or are you?",
		"Where did all the tasks go?",
		"This is not the task-list you're looking for.",
		"There is but one thing left to do, live.",
		"It is as if there weren't any tasks to begin with.",
		"Your task is in another castle.",
		"You've nothing else to do. For the moment...",
		"Are you sure you had anything to do today?",
		"Nothing ever happens in Mabase.",
		"Gotten things done!",
		"There, all finished. Pat yourself on the back.",
		"Stick a fork in yourself, 'cause you're done!",
		"Nothing to see here, move along."
	];
	
	$('#emptymessage').html(messages[Math.floor((Math.random()*(messages.length+1)))]);

	// See how many tasks are visible.
	var visible = 0;
	var selector = ".task";
	if ( !filters['done'] )
		selector += ":not(.done)";
	if ( !filters['late'] )
		selector += ":not(.late)";
	if ( !filters['free'] )
		selector += ":not(.free)";
	if ( !filters['next'] )
		selector += ":not(.next)";
	if ( !filters['now'] )
		selector += ":not(.now)";
	visible = $(selector).size();

	// If there are no visible tasks, display empty message.
	if ( visible > 0 )
		$('#emptymessage').hide(100);
	else
		$('#emptymessage').show(100);
	
};


