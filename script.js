// Default filter-states.		
// Override for persistence.													//TODO: Not yet persistent.
var filters = {
	'done': false,
	'late': true,
	'free': true,
	'now': true,
};


// The ready function.
$(document).ready(
	function() {
		
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
			
			// For the 'now' filter.	
			if ( filters['now'] ) {
				$(".filter#now").addClass('on');
				$('.task').not('.now').not('.done').not('.late').not('.free').hide();
			} else {
				$(".filter#now").removeClass('on');
				$('.task').not('.now').not('.done').not('.late').not('.free').show();
			}
		};
		setFiltersByState();					
		
		// Handler for the 'done' filter.
		$(".filter#done").on("click", function(event){
			
			// Toggle visibility of all tasks with class 'done'.
			$('.task.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(this).toggleClass('on');
			
			// Toggle filter-state.
			filters['done'] = !filters['done'];
			
		});
		
		// Handler for the 'late' filter.
		$(".filter#late").on("click", function(event){
			
			// Toggle visibility of all tasks with class 'late' but not 'done'.
			$('.task.late').not('.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(this).toggleClass('on');
			
			// Toggle filter-state.
			filters['late'] = !filters['late'];
			
		});
		
		// Handler for the 'free' filter.
		$(".filter#free").on("click", function(event){
						
			// Toggle visibility of all tasks with class 'free' but not 'done' or 'late'.
			$('.task.free').not('.done').not('.late').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(this).toggleClass('on');
			
			// Toggle filter-state.
			filters['free'] = !filters['free'];
			
		});
		
		// Handler for the 'now' filter.
		$(".filter#now").on("click", function(event){
						
			// Toggle visibility of all tasks NOT with class 'now', 'done', 'late', and 'free'.
			$('.task').not('.now').not('.done').not('.late').not('.free').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(this).toggleClass('on');
			
			// Toggle filter-state.
			filters['now'] = !filters['now'];
			
		});
		
	}
);



