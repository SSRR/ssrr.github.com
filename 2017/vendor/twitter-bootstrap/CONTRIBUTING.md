# Contributing to Bootstrap

Looking to contribute something to Bootstrap? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.


## Using the issue tracker

The [issue tracker](https://github.com/twbs/bootstrap/issues) is
the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests)
and [submitting pull requests](#pull-requests), but please respect the following
restrictions:

* Please **do not** use the issue tracker for personal support requests.  Stack
  Overflow ([`twitter-bootstrap-3`](http://stackoverflow.com/questions/tagged/twitter-bootstrap-3) tag) or [IRC](https://github.com/twbs/bootstrap/blob/master/README.md#community) are better places to get help.

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

* Please **do not** open issues or pull requests regarding the code in
  [`Normalize`](https://github.com/necolas/normalize.css) (open them in
  their respective repositories).


## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.
   [This JS Bin](http://jsbin.com/EBAwOkOK/1) is a helpful template.


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).


## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.


## Pull requests

Good pull requests—patches, improvements, new features—are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the
project (indentation, accurate comments, etc.) and any other requirements
(such as test coverage).

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/bootstrap.git
   # Navigate to the newly cloned directory
   cd bootstrap
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/twbs/bootstrap.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE.md).


## Code guidelines

### HTML

- Two spaces for indentation, never tabs.
- Double quotes only, never single quotes.
- Always use proper indentation.
- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

- CSS changes must be done in `.less` files first, never just in the compiled `.css` files.
- Adhere to the [CSS property order](http://markdotto.com/2011/11/29/css-property-order/).
- Multiple-line approach (one property and value per line).
- Always a space after a property's colon (e.g., `display: block;` and not `display:block;`).
- End all lines with a semi-colon.
- For multiple, comma-separated selectors, place each selector on its own line.
- Don't add vendor prefixed properties to their unprefixed counterparts (e.g., only `box-sizing` and not also include `-webkit-box-sizing`), as this is done automagically at build time.
- Attribute selectors, like `input[type="text"]` should always wrap the attribute's value in double quotes, for consistency and safety (see this [blog post on unquoted attribute values](http://mathiasbynens.be/notes/unquoted-attribute-values) that can lead to XSS attacks).
- Attribute selectors should only be used where absolutely necessary (e.g., form controls) and should be avoided on custom components for performance and explicitness.
- Series of classes for a component should include a base class (e.g., `.component`) and use the base class as a prefix for modifier and sub-components (e.g., `.component-lg`).
- Avoid inheritance and over nesting—use single, explicit classes whenever possible.
- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

### JS

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

### Checking coding style

Run `grunt test` before committing to ensure your changes follow our coding standards.


## License

By contributing your code, you agree to license your contribution under the [MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE).

Prior to v3.1.0, Bootstrap was released under the Apache License v2.0.

t pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

In particular, **pull requests that add new features to Bootstrap v3 will be
rejected.** Bootstrap v3 is now in maintenance mode and is therefore closed
off to new features, so that we can focus our efforts on Bootstrap v4, the
future of the framework. Pull requests that add new features should target
[Bootstrap v4 (the `v4-dev` git branch)](https://github.com/twbs/bootstrap/tree/v4-dev)
instead, where they will be welcomed and duly considered.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the
project (indentation, accurate comments, etc.) and any other requirements
(such as test coverage).

**Do not edit `bootstrap.css`, `bootstrap-theme.css`, or `bootstrap.js`
directly!** Those files are automatically generated. You should edit the
source files in [`/bootstrap/less/`](https://github.com/twbs/bootstrap/tree/master/less),
[`/bootstrap/scss/`](https://github.com/twbs/bootstrap/tree/v4-dev/scss) (for Bootstrap v4),
and/or [`/bootstrap/js/`](https://github.com/twbs/bootstrap/tree/master/js) instead.

Similarly, when contributing to Bootstrap's documentation, you should edit the
documentation source files in
[the `/bootstrap/docs/` directory of the `master` branch](https://github.com/twbs/bootstrap/tree/master/docs).
**Do not edit the `gh-pages` branch.** That branch is generated from the
documentation source files and is managed separately by the Bootstrap Core Team.

Adhering to the following process is the best way to get your work
included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/bootstrap.git
   # Navigate to the newly cloned directory
   cd bootstrap
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/twbs/bootstrap.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely to be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE) (if it
includes code changes) and under the terms of the
[Creative Commons Attribution 3.0 Unported License](docs/LICENSE)
(if it includes documentation changes).

### Pull request bots

[@twbs-rorschach](https://github.com/twbs-rorschach) is a Bootstrap bot that hangs out in our GitHub issue tracker and automatically checks all pull requests for a few simple common mistakes. It's possible that Rorschach might leave a comment on your pull request and then close it. If that happens, simply fix the problem(s) mentioned in the comment (there should be link(s) in the comment explaining the problem(s) in detail) and then either:

* Push the revised version to your pull request's branch and post a comment on the pull request saying that you've fixed the problem(s). One of the Bootstrap Core Team members will then come along and reopen your pull request.
* Or you can just open a new pull request for your revised version.

[@twbs-savage](https://github.com/twbs-savage) is a Bootstrap bot that automatically runs cross-browser tests (via [Sauce](https://saucelabs.com) and Travis CI) on JavaScript pull requests. Savage will leave a comment on pull requests stating whether cross-browser JS tests passed or failed, with a link to the full Travis build details. If your pull request fails, check the Travis log to see which browser + OS combinations failed. Each browser test in the Travis log includes a link to a Sauce page with details about the test. On those details pages, you can watch a screencast of the test run to see exactly which unit tests failed.


## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines) for more details.

### JS

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"
- Don't use [jQuery event alias convenience methods](https://github.com/jquery/jquery/blob/master/src/event/alias.js) (such as `$().focus()`). Instead, use [`$().trigger(eventType, ...)`](http://api.jquery.com/trigger/) or [`$().on(eventType, ...)`](http://api.jquery.com/on/), depending on whether you're firing an event or listening for an event. (For example, `$().trigger('focus')` or `$().on('focus', function (event) { /* handle focus event */ })`) We do this to be compatible with custom builds of jQuery where the event aliases module has been excluded.

### Checking coding style

Run `grunt test` before committing to ensure your changes follow our coding standards.


## License

By contributing your code, you agree to license your contribution under the [MIT License](LICENSE).
By contributing to the documentation, you agree to license your contribution under the [Creative Commons Attribution 3.0 Unported License](docs/LICENSE).

Prior to v3.1.0, Bootstrap's code was released under the Apache License v2.0.
