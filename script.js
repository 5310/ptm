// Default filter-states.		
// Override for persistence.													//TODO: Not yet persistent.
var filters = {
	'done': false,
	'late': true,
	'free': true,
	'next': true,
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
			if ( filters['next'] ) {
				$(".filter#next").addClass('on');
				$('.task.next').not('.done').not('.late').not('.free').show(100);
			} else {
				$(".filter#next").removeClass('on');
				$('.task.next').not('.done').not('.late').not('.free').hide(100);
			}
		};
		setFiltersByState();					
		
		// Handlers for the specific filter toggles.
		
		$(".filter#done").not('.disabled').on("click", function(event){
			
			// Toggle visibility of all tasks with class 'done'.
			$('.task.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#done").toggleClass('on');
			
			// Toggle filter-state.
			filters['done'] = !filters['done'];
			
		});
		
		// Handler for the 'late' filter.
		$(".filter#late").not('.disabled').on("click", function(event){
			
			// Toggle visibility of all tasks with class 'late' but not 'done'.
			$('.task.late').not('.done').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#late").toggleClass('on');
			
			// Toggle filter-state.
			filters['late'] = !filters['late'];
			
		});
		
		// Handler for the 'free' filter.
		$(".filter#free").not('.disabled').on("click", function(event){
						
			// Toggle visibility of all tasks with class 'free' but not 'done' or 'late'.
			$('.task.free').not('.done').not('.late').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#free").toggleClass('on');
			
			// Toggle filter-state.
			filters['free'] = !filters['free'];
			
		});
		
		// Handler for the 'now' filter.
		$(".filter#next").not('.disabled').on("click", function(event){
						
			// Toggle visibility of all tasks with class 'next' but not 'done', 'late', and 'free'.
			$('.task.next').not('.done').not('.late').not('.free').toggle(100);
			
			// Toggle 'on' class on the filter itself.
			$(".filter#next").toggleClass('on');
			
			// Toggle filter-state.
			filters['next'] = !filters['next'];
			
		});
		
	}
);



