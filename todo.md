Ironic isn't it? I'm keeping a textual todo for a frontend to RTM?

1.	~~Design:~~
	1.	~~Mock it!~~
	2.	~~(Statically) make it!~~

2.	~~Familiarize with REST and the RTM API.~~
	1.	~~Learn about and obtain API key.~~
	2.	~~Waste a lot of time getting cross-domain REST calls to work.~~
	3.	~~Make sure of how to get REST calls to work.~~
	
3.	~~Start work:~~
	1.	~~Set-up project tree.~~
	2.	~~Gitify it.~~
    
4.	~~Write front-end behaviors with dummy tasks:~~
	1.	~~Settle of a filtering scheme.~~
	2.	~~Make filters actually filter tasks according to the scheme.~~
	3.	~~Display a message when there's nothing to show.~~
	4.	~~Decide about 'now':~~
		~~Add a perma-on button at front, that will set additional filters off if clicked: now + next free late done~~
		~~OR is it that now toggles active tasks?~~
		~~Decided: no special 'now', only an usual filter for intuitions's sake.~~
	5.	~~Disable filters if no relevant task is present.~~
	6.	~~Add disabled style.~~
	7.	~~Remove handlers for disabler filters.~~
	8.	~~Add relevant tool-tips for filters, disabled or otherwise.~~
	9.	~~Add hooks for task clicks. Mark the dummy tasks done, for now.~~
	10. 	~~Add time-stamps to tasklist entry when completed.~~
	
5.	Get and show tasks:
	1.	~~Get task-list filtered as desired, and store it for later use. Manually sign for now.~~
	2.	~~Parse task-list into HTML.~~
	3.  	~~Fix date parsing from RTM JSON to Date object.~~
	4.  	~~Add task-filter-tags as applicable.~~
	5.	~~Write an auto-updater for time-based task-tags.~~
	6.	~~Sort HTML tasks as designed.~~
	7.	~~See why the 'done' filter comes alive if there's a completed task, but does nothing when clicked.~~
	8.	~~Actually get the tasklist from RTM.~~
	9.	~~See if tasklist request is returning as it should.~~
	10.	~~See why the dates were off.~~
	11.	~~See why the AJAX call only works in Chrome right now. Write generic-callback.~~
    
6.	~~v1 - Personal release.~~
    
7.  Use user-provided API keys.
	1.  Write GUI way to input API keys from other users. Provide simple instructions, and a warning.
	2.	Store key to cookies or local-stores.
	3.	Authenticate using API key. Get further authentication keys.
	3.	Make everything use these keys for signing instead of the linked file.
	
8.	Fleshing things out:
	1.	Make sure to set-up success and failure and loading messages for every call.
	2.	Implement refresh/sync routines:
		1.	Implement pending changes notification.
		2.	Implement manual syncing.
		3.	Implement automatic syncing with a modest refresh rate.
		4.	Make it so that the 'done' tasks only show between refresh, if any.
	3.	Write task-completing routine.

	
9. Pre-release polish.
	1.  Use @font-face, and add fallback.
	2.  Refactor CSS for cleanliness.
	3.  See that the colors and type are also readable in Firefox. Unfortunately, this isn't automatically assumable.
	3.  Add noscript message.
	4.  Make sure to meet branding guidelines and licensing messages.
	5.  Double-check HTML metadata.
	6.  Double-check for API-key leaks.
	7.  Write proper readme.
	8.  See if reset-file can be CDN'd.
	9.	Be polite, and include libraries instead of hotlinking them.
	10.	Delay the tooltips as acceptable.
	11.	Add MOAR empty-messages!
        
10. v2 - "Public" release.
    
11. Post-release polish.
	1.  Make site work well with mobile devices with proper style.
	2.	Maybe include a dynamic favicon which displays pending tasks?
