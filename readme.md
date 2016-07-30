# Vanilla JavaScript TodoMVC Example

## Purpose

This was originally part of [an ES6 training](http://kcd.im/es6-intro-slides) by [Kent C. Dodds](https://twitter.com/kentcdodds)

Now I'm using it to teach people about [Webpack](http://webpack.github.io/):

- [Egghead.io lessons](http://kcd.im/egghead-webpack)
- [Frontend Masters](http://kcd.im/fem-webpack)

## Thanks

This codebase was originally taken from the TodoMVC project starting [here](https://github.com/tastejs/todomvc/tree/563d1e1b8cee5f6ec962ec43663cb66a72b69d76/examples/vanillajs). Big thanks to them!

## Project Setup

This project assumes you have [NodeJS v6](http://nodejs.org/) or greater installed. You should
also have [npm v3](https://www.npmjs.com/) or greater installed as well (this comes packaged
with Node 6). You'll also need a recent version of [git](https://git-scm.com/) installed
as well.

You may have come to this project from different varying sources. There are a
different series of branches for each workshop/course I've done. To get started with
the project, start with this:

1. [Sign up](https://github.com/join) for a GitHub Account (if you don't already have one)
2. [Fork](https://help.github.com/articles/fork-a-repo/) this repo
3. [Clone](https://help.github.com/articles/cloning-a-repository/) your fork
4. In the directory you cloned the repository, run `git fetch --all`

If you need help with these steps, you might check out
[this free Egghead.io course](http://kcd.im/pull-request) which can help you get things going.

Finally, based on which version of the project you're looking for (workshop, egghead, or
Frontend Masters) you'll run one of the following commands in the cloned directory:

- **ES6 Workshop**: `npm run setup:workshop`
- **Egghead Course**: `npm run setup:egghead`
- **Frontend Masters Workshop**: `npm run setup:fem`

If you get any failures at this point something is wrong and needs to be fixed. Remember,
[Google](https://google.com) and [StackOverflow](https://stackoverflow.com) are your friends.

You might find it helpful to see a list of the available branches. Run: `git branch` for that.

## Notes

Because Webpack 2 is currently in beta, there are issues with `peerDependencies`, so you’ll have to use npm version 3 to be able to install the dependencies.

## LICENSE

MIT
