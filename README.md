# [dylanirlbeck.com](https://dylanirlbeck.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/6bdc0f00-9e09-410e-9d6e-999b8416bb5f/deploy-status)](https://app.netlify.com/sites/dylanirlbeck/deploys)

Here lives the code for my personal website. The project is designed to be minimally-dependent on other software, so you'll quickly notice that I don't use any sort of static site generator (SSG). In fact, I'm sort of building my own. As others have written, SSGs -- like Hugo, Gatsby, Jekyll -- are designed with universality in mind: they try to be everything to everyone, and can add a lot of unneeded complexity to a small project like this one.

My primary goal for my website is to focus on the _content_. The site should be readable, fast, accessible, and navigable: if these criteria are not met, I'm off course and need to correct.

[Read more about my website's design principles](https://dylanirlbeck.com/blog/design-principles).

## Writing process

My writing process is simple and decidedly manual. For any blog posts, I use [Notion](https://notion.so) to handle the actual writing process: drafting, editing, and so forth. Once I'm finished, I'll export the content as Markdown and use [showdown](https://github.com/showdownjs/showdown) to convert the Markdown into HTML that I can insert into my site.

I'll then set up all the technical boilerplate (i.e. an entry in `blog/` and a hyperlink from `blog.html` to the new post). Once I push to the `main` branch, Netlify will take care of deploying the new code automatically.

## Stack

Aside from being a home for my public persona, this project also represents my foray into fundamental web technologies. I aim to understand every part of my stack: from the hosting and DNS layer all the way up to the site's CSS styles. I seldom work software where I can understand every piece of the stack (including my dependencies), and that is what makes my personal website all the more interesting to build.

## Open source

I commit to keeping my website code open-source and writing about its development process and design decisions as much as possible. I'd love to see more people understanding their software from a deeper level: an easy way to enforce this for myself is to build a website with pure HTML and CSS.

## Inspiration

There are a number of personal websites/blogs I've taken inspiration from. In no particular order:
* [Patrick Collison](https://patrickcollison.com/)
* [Devon Zuegel](https://devonzuegel.com/)
* [Dan Luu](https://danluu.com/)
