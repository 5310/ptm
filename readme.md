Posterize the Milk
==================

Posterize the Milk -- and not _pasteurize_ the milk -- is a minimalistic daily task-overview-er for Remember the Milk. 

What this means is that PTM -- and _definitely_ not RTM, _branding-guidelines forbid_ -- is a simple little single-page web-app that shows **my** tasks for the day, and lets me filter them out for "maximum focus."

PTM, as should be obvious, is a project that scratches a personal itch, as well as teaches me some practical REST API wrangling.

Roadmap
-------

At the moment, PTM has had its first release, which is only for _my personal_ use. But eventually, it will come to support any RTM user-- or so I hope.

If the reader would like to see what else is planned, and how far along the path PTM is, please consult the-ironically-ironic-textual-todo-list for the project: [`todo.md`][todo]

Caveats
-------

For now -- as asserted -- PTM is hard-coded to display tasks from my _personal_ todo list. Now, my todo list isn't actually a secret, but it's not supposed to be public either. This will change soon as I add some proper authentication onto it. 

But it seems that there is _no_ way to keep my secret key a secret, so in order to do that, I'll probably resort to getting the user to generate and use their own keys and then authenticate themselves. This would be a one-time-affair, hopefully.

License
-------

Other than the Remember the Milk API, the initialism 'RTM' and their API (which has been declared un-copyrightable in the EU, and is as yet undecided in the US, FYI :) this project is [MIT licensed][mitl].

Of course, Remember the Milk is itself copyright to to Remember the Milk.

And, as per RTM's branding guidelines:

"This product uses the Remember The Milk API but is not endorsed or certified by Remember The Milk."



[todo]: https://github.com/5310/ptm/blob/master/todo.md "todo.md"
[mitl]: http://www.opensource.org/licenses/MIT "The MIT License"
