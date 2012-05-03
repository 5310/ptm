// Delay for the recurring function that parses tasks in ms.
var update_delay = 1 * 10 * 1000;

// Delay for the recurring function that syncs the tasklist in ms.
var sync_delay = 10 * 60 * 1000;


// Default filter-states.		
// Override for persistence.							//TODO: Not yet persistent.
var filters = {
	'done': false,
	'late': true,
	'free': true,
	'next': true,
	'now':	true
};

// Hooks and messages for the tooltips.
// Yes, this only initializes the hooks, and does not assign them yet.
var tooltips = {
	'done': {'hook': null, 
		'on': "Hide recently finished unsynced tasks.", 
		'off': "Show recently finished unsynced tasks.", 
		'disabled': "There are no unsynced recently completed tasks."},
	'late': {'hook': null, 
		'on': "Hide unfinished tasks from before.", 
		'off': "Show unfinished tasks from before.", 
		'disabled': "You have no pending tasks."},
	'free': {'hook': null, 
		'on': "Hide unscheduled tasks of the day.", 
		'off': "Show unscheduled tasks of the day.", 
		'disabled': "There are no unscheduled tasks to do today."},
	'next': {'hook': null, 
		'on': "Hide upcoming tasks.", 
		'off': "Show upcoming tasks.", 
		'disabled': "There are no more tasks scheduled for today."},
	'now':	{'hook': null, 
		'on': "Hide currently active tasks.", 
		'off': "Show currently active tasks.", 
		'disabled': "There are no tasks scheduled for right now."}
};

// Fancy list of messages to randomly choose from.
var empty_messages = [
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

// The ready function.
$(document).ready(
	function() {
	    
	    // Sets-up Tooltips.
	    setup();
	    
	    // Syncs and updates.
	    sync();
	    update();
	    
	    // Sets-up recurring routines.
	    window.setInterval(sync, sync_delay);
	    window.setInterval(update, update_delay);

	}
);

// Sync tasklist from RTM sort.
var sync = function() {								//TODO: Add actual syncing here.
    // Sort freshly synced tasklist.
    sortTasklist();
};

// Chain for updating tasks from task-lists and elapsed time.
var update = function() {
    // Parse tasks!
    parseTasks();
    // Reapply handler for task-clicks.						//BUG: This shouldn't be needed. Why don't the `.on()` on tasks work?
    setTasksHandles();
};

var setup = function() {
    // Sets-up Tooltips.
    setupTooltips();	
	    
    // Sets filter availability by available tasks.
    setFiltersAvailability();			
	    
    // Handlers for the specific filter toggles.
    setFilterHandles();
	    
    // Handler for the tasks.
    //setTasksHandles();  							//BUG: Parsing removes handles. So this will be done on `update()`.
};

// Sort tasklist based on our proprietary algortihm...:cough:
var sortTasklist = function() {
    
    //Sort lexicographically.
    tasklist = tasklist.sort(function(a, b){
	var a_sort = a['name'];
	var b_sort = b['name'];
	if ( a_sort > b_sort )
	    return 1;
	else
	    return -1;
    });
    
    // Sort by due-date-time.
    tasklist = tasklist.sort(function(a, b){
	var a_sort = Date.parse(a['task']['due']);
	var b_sort = Date.parse(b['task']['due']);
	return a_sort - b_sort;
    });
    
    // Sort by due-time.
    tasklist = tasklist.sort(function(a, b){
	var a_ms = Date.parse(a['task']['due']);
	var a_time = new Date(a_ms);
	var a_sort = a_time.getHours()*10000 + a_time.getMinutes()*100 + a_time.getSeconds();
	var b_ms = Date.parse(b['task']['due']);
	var b_time = new Date(b_ms);
	var b_sort = b_time.getHours()*10000 + b_time.getMinutes()*100 + b_time.getSeconds();
	return a_sort - b_sort;
    });
    
};

// Parse tasks from JSON to HTML.
var parseTasks = function() {							
    
    // Empty the HTML list.
    $('#list').empty();
    
    for ( i in tasklist ) {
        
        // Create a task element.
        var task = $('<div />').addClass('task');
        
	// Set task-id.
	task.attr('id', tasklist[i]['id']);
	
        // Add classes to the task as applicable.
	tagTaskByIndex(i, task);
	
        // Populate task with information from tasklist:
        
        // time
        task.append($('<div />').addClass('time').queue(
            function() {
                
                // Convert due-date from task into a Date object.
                var dueMs = Date.parse(tasklist[i]['task']['due']);
		var due = new Date(dueMs);
                
                // Initializing date string for task.
                var date = "";
                var time = "";
                
                // Parse date.
                if ( task.hasClass('late') || task.hasClass('free') ) {       	
                    var now = new Date();
                    var today = new Date(
                        now.getFullYear(), 
                        now.getMonth(), 					// No need to add 1 to month.
                        now.getDate(),
                        0, 0, 0 );                                      	
                    var diff = DateDiff.inMs(due, today);             		// DateDiff is handy!
                    if ( diff < 0 )
                        date = "today";
                    else if ( DateDiff.inDays(due, today) <= 86400000 )
                        date = "yesterday";
                    else
                        date = DateDiff.inDays(due, today)+" days ago";
                }
                
                // Parse time.
                if ( tasklist[i]['task']['has_due_time'] == '1' )
                    time = zeropad(due.getHours(), 2)+":"+zeropad(due.getMinutes(), 2);
                
                // Set time.
                $(this).text(date+" "+time);
                
            }
        ));
        
        // priority
        task.append($('<div />').addClass('priority').queue(
            function() {
                var priority_map = {
                    "1": "···",
                    "2": "··",
                    "3": "·",
                    "N": ""
                };
                $(this).text(priority_map[ tasklist[i]['task']['priority'] ]);
            }
        ));
        
        // text
        task.append($('<div />').addClass('text').text(
            // This is the simplest :]  
            tasklist[i]['name']
        ));
        
        // link
        task.append($('<div />').addClass('link').queue(
            function() {
                if ( tasklist[i]['url'] )
                    $(this).append($('<a target="_blank" />').text('@').attr('href', tasklist[i]['url']));
            }
        ));
        
        // tags
        task.append($('<div />').addClass('tags').queue(
            function() {
                if ( tasklist[i]['tags']['tag'] !== undefined ) {
                    if ( typeof(tasklist[i]['tags']['tag']) == typeof([]) )
                        for ( j in tasklist[i]['tags']['tag'] )
                            $(this).append( $('<div />').text(tasklist[i]['tags']['tag'][j]) );
                    else
                        $(this).append( $('<div />').text(tasklist[i]['tags']['tag']) );
                }
            }
        ));
	
        // Append the task itself to the list.
        $('#list').append(task);
	
	setFiltersByState();
        
    }
    
};

// Task tagger.
var tagTaskByIndex = function(i, task) {
    
    // Set up dates.
    var dueMs = Date.parse(tasklist[i]['task']['due']);
    var due = new Date(dueMs);
    var estimate = false; // This starts as false.
    var now = new Date();
    var today = new Date(
		now.getFullYear(), 
		now.getMonth(), 
		now.getDate(),
		0, 0, 0 );
    
    // See if task is already complete.
    if ( tasklist[i]['task']['completed'] != "" )
	task.addClass('done');
    
    // See if task is already late.
    if ( DateDiff.inMs( due, today ) > 0 ) 
	task.addClass('late');
	
    // See if task is free, mon. Else...
    if ( tasklist[i]['task']['has_due_time'] == '0' ) 
	task.addClass('free');
    else {
	// If task is due in the future, tag as next. Else...
	if ( DateDiff.inMs( due, now ) < 0 ) 
	    task.addClass('next');
	else {
	    // For now, just tag as now.					//TODO: Add estimate calculation here.
	    task.addClass('now');
	}
    }
};

// Adds tooltips and assigns hooks for updates.
var setupTooltips = function() {
	
	// For the filters:
	
	$(".filter#done").simpletip({ content: tooltips['done']['default'], fixed: false });
	tooltips['done']['hook'] = $(".filter#done").eq(0).simpletip(); 
	
	$(".filter#late").simpletip({ content: tooltips['late']['default'], fixed: false });
	tooltips['late']['hook'] = $(".filter#late").eq(0).simpletip(); 
	
	$(".filter#free").simpletip({ content: tooltips['free']['default'], fixed: false });
	tooltips['free']['hook'] = $(".filter#free").eq(0).simpletip(); 
	
	$(".filter#next").simpletip({ content: tooltips['next']['default'], fixed: false });
	tooltips['next']['hook'] = $(".filter#next").eq(0).simpletip(); 
	
	$(".filter#now").simpletip({ content: tooltips['now']['default'], fixed: false });
	tooltips['now']['hook'] = $(".filter#now").eq(0).simpletip(); 
	
};

// Updates Filter tooltips based of state.
var updateFiltersTooltips = function() {
	
	if ( $(".filter#done").hasClass('disabled') )
		tooltips['done']['hook'].update(tooltips['done']['disabled']); 
	else if ( $(".filter#done").hasClass('on') )
		tooltips['done']['hook'].update(tooltips['done']['on']); 
	else
		tooltips['done']['hook'].update(tooltips['done']['off']);
		
	if ( $(".filter#late").hasClass('disabled') )
		tooltips['late']['hook'].update(tooltips['late']['disabled']); 
	else if ( $(".filter#late").hasClass('on') )
		tooltips['late']['hook'].update(tooltips['late']['on']); 
	else
		tooltips['late']['hook'].update(tooltips['late']['off']);


	if ( $(".filter#free").hasClass('disabled') )
		tooltips['free']['hook'].update(tooltips['free']['disabled']); 
	else if ( $(".filter#free").hasClass('on') )
		tooltips['free']['hook'].update(tooltips['free']['on']); 
	else
		tooltips['free']['hook'].update(tooltips['free']['off']);
		
	if ( $(".filter#next").hasClass('disabled') )
		tooltips['next']['hook'].update(tooltips['next']['disabled']); 
	else if ( $(".filter#next").hasClass('on') )
		tooltips['next']['hook'].update(tooltips['next']['on']); 
	else
		tooltips['next']['hook'].update(tooltips['next']['off']);


	if ( $(".filter#now").hasClass('disabled') )
		tooltips['now']['hook'].update(tooltips['now']['disabled']); 
	else if ( $(".filter#now").hasClass('on') )
		tooltips['now']['hook'].update(tooltips['now']['on']); 
	else
		tooltips['now']['hook'].update(tooltips['now']['off']);
	 
};

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
		
	// Also sets the tooltips according to availability.
	updateFiltersTooltips();
	
	
};

// Adds on-click handlers to events.
var setFilterHandles = function() {
    
    $(".filter#done").on("click", function(event) {
	    
	if ( !$(this).hasClass('disabled') ) {
	    
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
	    
	}
	    
    });
    
    // Handler for the 'late' filter.
    $(".filter#late").on("click", function(event) {
	    
	if ( !$(this).hasClass('disabled') ) {
	    
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
	    
	}		
	    
    });
    
    // Handler for the 'free' filter.
    $(".filter#free").on("click", function(event) {
	    
	if ( !$(this).hasClass('disabled') ) {
				    
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
	
	}	
	    
    });
    
    // Handler for the 'next' filter.
    $(".filter#next").on("click", function(event) {
	    
	if ( !$(this).hasClass('disabled') ) {
				    
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
	    
	}		
	    
    });
    
    // Handler for the 'now' filter.
    $(".filter#now").on("click", function(event) {
	    
	if ( !$(this).hasClass('disabled') ) {
				    
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
	
	}			
	    
    });
		
};

// Adds on-click handlers to tasks so that they get marked un/done.
var setTasksHandles = function() {
  
  $(".task").on("click", function(event) {

	    // Marks tasks as done if clicked.
	    $(this).toggleClass('done').delay(750).queue(function(next) {
			    if ( !filters['done'] )
				    $(this).hide(500);
			    next();
		    });
	    
	    // Mark done-time.
	    var now = new Date();
	    for ( i in tasklist ) {
		if ( tasklist[i]['id'] == $(this).attr('id') )
		    if ( tasklist[i]['task']['completed'] == "" )
			tasklist[i]['task']['completed'] = now.toISOString();
		    else
			tasklist[i]['task']['completed'] = "";
	    }
	    now.toISOString();
	    
	    // Refresh list.
	    showEmptyMessage();	
	    setFiltersAvailability();
	    
    });
		  
};

// Shows the empty-list message.
var showEmptyMessage = function() {
	
	$('#emptymessage').html(empty_messages[Math.floor((Math.random()*(empty_messages.length+1)))]);

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

// Utility function to return difference between date-obejcts.
var DateDiff = {
    
    inMs: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
	
	return t2-t1;
    },
 
    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return parseInt((t2-t1)/(24*3600*1000));
    },
 
    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
 
        return parseInt((t2-t1)/(24*3600*1000*7));
    },
 
    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();
 
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
 
    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

// Utility function that pads an integer with leading zeroes while returning it as a string.
var zeropad = function (num, size) {
    var string = num+"";
    while (string.length < size) string = "0" + string;
    return string;
}
