# Webpack Workshop

> Using the Vanilla JavaScript TodoMVC Example

[![MIT License][license-badge]][LICENSE]
[![Donate][donate-badge]][donate]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]

## Purpose

This was originally part of [an ES6 training](http://kcd.im/es6-intro-slides) by [Kent C. Dodds](https://twitter.com/kentcdodds)

Now I'm using it to teach people about [Webpack](http://webpack.github.io/):

- [Egghead.io lessons](http://kcd.im/egghead-webpack)
- [Frontend Masters](http://kcd.im/fem-webpack)

## Thanks

This codebase was originally taken from the TodoMVC project starting [here](https://github.com/tastejs/todomvc/tree/563d1e1b8cee5f6ec962ec43663cb66a72b69d76/examples/vanillajs). Big thanks to them!

## Latest Workshop

This repo has been used to teach in several different places (egghead, Frontend Masters, etc.). If you're coming here
to follow along with that, then I recommend you follow the project setup for that (see below). The most recent and
up-to-date version of the workshop is [the Frontend Masters workshop](http://kcd.im/fem-webpack). This is a linear
workshop and starts with the `FEM/00-original-project` branch. See
[the slides](https://slides.com/kentcdodds/webpack-deep-dive).

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

Running Webpack with `webpack -p` is not [showing the warnings](https://webpack.js.org/guides/migrating/#uglifyjsplugin-warnings) about the dead code elimination anymore. However, it is working as expected.

### Updates

The ecosystem moves fast. So this section of the README will be dedicated to tracking changes in the ecosystem so you
can follow the repo, but be aware of changes in the latest versions of the dependencies you'll be installing (or if
there are better dependencies to use now).

- All courses
  - `babel-preset-es2015-webpack` is no longer necessary for leveraging tree shaking. You can now just use
  `babel-preset-es2015` with a special configuration to indicate modules should not be transformed.
  [More info](https://github.com/kentcdodds/es6-todomvc/issues/13)
- Egghead Course
  - Using `istanbul` is no longer necessary for checking code coverage and can actually be accomplished using special
  configuration in `karma.conf.js` with the `karma-coverage` plugin like
  [this](https://github.com/kentcdodds/es6-todomvc/blob/f4f790ef7602bf9de4620841848d91f5213e647e/karma.conf.js#L22-L29).

### Contributing

Super nice that you're interested in contributing. Unfortunately things are pretty complex with how things are set up
with branches for each section of the workshop. So feel free to file pull requests to indicate what needs to be changed
but if I decide to implement a change in the workshop code, I'll probably just have to manually make the updates.
Thanks!

## LICENSE

MIT

[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/kentcdodds/es6-todomvc/blob/master/LICENSE
[donate-badge]: https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square
[donate]: http://kcd.im/donate
[github-star-badge]: https://img.shields.io/github/stars/kentcdodds/es6-todomvc.svg?style=social&label=Star
[github-star]: https://github.com/kentcdodds/es6-todomvc/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20fantastic%20webpack%20workshop!%20http://kcd.im/webpack-workshop-repo%20%F0%9F%98%8E
[twitter-badge]: https://img.shields.io/twitter/url/https/kcd.im/webpack-workshop-repo.svg?style=social
