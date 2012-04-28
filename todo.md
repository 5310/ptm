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
    
4.	Write front-end behaviors with dummy tasks:
	1.	~~Settle of a filtering scheme.~~
	2.	~~Make filters actually filter tasks according to the scheme.~~
	3.	Display a message when there's nothing to show.
	4.	Make message intelligent!
	5.	Decide whether to implement an overriding 'now' button that disables all other filters and then brings them back to their previous state.
	6.	Disable filters if no relevant task is present.
	7.	Add relevant tooltips.
	
5.	Get and show tasks:
	1.	Get task-list filtered as desired, and store it for later use. Manually sign for now.
	2.	Parse task-list into HTML.
	3.	Test to see if everything works as it should.
	
6.	Authentication:
	1.	Write authentication routine.
	2.	Set up linked scripts for the smallest leak of API key. REMEMBER: gitignore this file!

7.	Fleshing things out:
	1.	Make sure to set-up success and failure and loading messages for every call.
	2.	Implement refresh/sync routines:
		1.	Implement pending changes notification.
		2.	Implement manual syncing.
		3.	Implement automatic syncing with a modest refresh rate.
		4.	Make it so that the 'done' tasks only show between refresh, if any.
	3.	Write task-completing routine.
    
8.	Personal release.

9.  Use user-provided API keys.
	1.  	Write GUI way to input API keys from other users. Provide simple instructions, and a warning.
	2.	Store key to cookies or local-stores.
	3.	Make everything use this key for signing instead of the linked file.
	
10. Pre-release polish.
	1.  	Use @font-face, and add fallback.
	2.  	Refactor CSS for cleanliness.
	3.  	Add noscript message.
	4.  	Make sure to meet branding guidelines and licensing messages.
	5.  	Double-check HTML metadata.
	6.  	Double-check for API-key leaks.
	7.  	Write proper readme.
	8.  	See if reset-file can be CDN'd.
        
11. "Public" release.
    
12. Post-release polish.
	1.  	Make site work well with mobile devices with proper style.
	2.		Maybe include a dynamic favicon which displays pending tasks?
