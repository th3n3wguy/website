---
title: "A Hypothesis On How React.js Became So Popular"
description: "This entire article is going to proceed with a single assumption:"
pubDate: 2019-02-18
tags: ["JavaScript","React"]
sourceUrl: "https://medium.com/@th3n3wguy/a-hypothesis-on-how-react-js-became-so-popular-dc5953c67cf6"
draft: false
---

* * *

<img src="../../images/blog/a-hypothesis-on-how-react-js-became-so-popular-1.jpg" alt="Illustration from “A Hypothesis On How React.js Became So Popular”">

This entire article is going to proceed with a single assumption:

> Humans don’t like change.

This idea has been debated and talked about by many people, so I will not debate on whether this is a valid assumption or not. If you don’t agree with this hypothesis, then you might as well stop reading, but I appreciate you taking the time to get this far!

That being said, humans will naturally gravitate to whatever is “new”, but as close as possible to anything that we already know. As developers, we always talk about how we are able to pick up and constantly change our ways of thinking, but I challenge that belief.

### Let’s take a quick trip back in time…

The year is 2̶0̶0̶4̶ 1994 (thanks to [Ross Kuehl](https://medium.com/u/2c6102a32796) for correcting me in the comments) and [Rasmus Lerdorf](https://en.wikipedia.org/wiki/Rasmus_Lerdorf) has decided to create a new programming language: [PHP](https://en.wikipedia.org/wiki/PHP). It quickly gained popularity as one of the top languages to create dynamic web applications. I am not going to debate the reasons why it became so popular, but the point is that [it is widely popular](https://www.quora.com/Why-is-PHP-the-most-popular-language) and [drives a significant number of the websites on the internet.](https://w3techs.com/technologies/comparison/pl-java,pl-php) The most significant note of this is that Facebook was originally written in PHP. Once Facebook started becoming a massive force (sometime around 2008), someone within the Facebook organization decided that they needed to start putting some better structure / techniques around the PHP language.

Jump to 2010 where [Facebook decides to release XHP](https://www.facebook.com/notes/facebook-engineering/xhp-a-new-way-to-write-php/294003943919/), an extension to the PHP language. Shortly thereafter (around 2013), they released [HHVM](https://hhvm.com/) / [Hack](https://hacklang.org/) to really push the envelope and expand the abilities of the PHP language. At the time of writing this article, Facebook has even released multiple versions / bugfixes for HHVM / Hack [within the past 3 days](https://github.com/facebook/hhvm/releases). You might be asking yourself why I am even talking about server-side programming languages and frameworks, since this was supposed to be about React.js and why it has become so popular. Let’s take a look at some observations and maybe you will see where I came to my conclusion.

### Observation #1: Facebook has had a huge impact on the open-source community

Regardless of your viewpoint on Facebook as a company, one pure observation that you simply cannot overlook is that Facebook has had a tremendous impact on everyone across the world, and web application developers are no exception. There are very few applications in the world that have had to deal with same scale problems as Facebook. From the number of users, to the security of the application, to any other number of issues that their engineering teams have had to face, their importance in creating libraries and frameworks that deal with those issues at scale cannot be understated.

A quick look at [Facebook’s GitHub](https://github.com/facebook) shows the amount of time, effort, and money that they have spent contributing to the open-source community. At the time of this writing, they have 160 repositories with some of the most important software that many large companies are utilizing at scale, such as: [GraphQL](https://github.com/facebook/graphql), [React.js](https://github.com/facebook/react) / [JSX](https://github.com/facebook/jsx), [React Native](https://github.com/facebook/react-native), and [Jest](https://github.com/facebook/jest). As an example, companies such as Netflix and AirBnB rely upon React.js / JSX for driving the entire UI for their web applications.

### Observation #2: Nobody writes React without using JSX

Almost every example and real-world implementation of React uses JSX. While React does provide [examples of using React without JSX](https://reactjs.org/docs/react-without-jsx.html), I have yet to see any implementations where a development team has chosen to write React code without JSX. I am sure that there are other reasons, but the primary one is that it is just too time-consuming to write the code using the native React methods. Here is a quick example:

```javascript
// React with JSX
ReactDOM.render(
  <span>Welcome to the <strong>Jungle!</strong></span>,
  document.getElementById('root')
);
```

```javascript
// React without JSX
const strongTag = React.createElement('strong', null, 'Jungle!');
```

```javascript
ReactDOM.render(
  React.createElement('div', null, `Welcome to the ${strongTag}`),
  document.getElementById('root')
);
```

Now, once we realize that most React applications are built with JSX, you begin to realize that you are writing code eerily similar to how you write code in a PHP web application. This is especially true for any developer who has written web applications for Facebook or used Facebook’s HHVM / Hack / XHP frameworks.

### Observation #3: React / JSX is a natural transition for PHP developers

We have already observed that PHP is the largest programming language for websites, [even as of 2019](https://w3techs.com/technologies/comparison/pl-java,pl-php). If we go back to our original hypothesis (`Humans don’t like change` ), then one assumption clearly emerges:

> If the largest number of web developers across the world use PHP, then whichever “front-end” / JavaScript framework that causes the least amount of friction for them to adopt it, will likely become the most-popular.

Let’s take a quick look at comparing both languages to support my observation:

```php
// Sample PHP code that takes a name value and displays it within the HTML.
<!DOCTYPE html>
<html>
  <body>
    <?php
      $x = "Hello world!";
      echo "<h1>" . $x . "</h1>";
    ?>
  </body>
</html>
```

```javascript
// Sample React.js code that performs the same action.
const text = 'Hello world!'

ReactDOM.render(
  <h1>{text}</h1>,
  document.getElementById('root')
);
```

As you can see, other than the basic syntax changes between PHP and React / JSX, there are very little differences in the approaches. Now, one thing to note is that PHP isn’t always written like this. In many cases, the `class` functionality is used. Another option for many PHP developers that Facebook developed is [HHVM / Hack / XHP](https://docs.hhvm.com/hack/XHP/introduction), which provides a huge extension for the PHP language that is not built into it by default (such as types to provide type-safety).

### Observation #4: React’s release to the world had amazing timing

The year was 2013 and I had been writing web applications in [Angular.js](https://angularjs.org/) for a little over a year and prototyping with [Backbone.js](http://backbonejs.org/), [Ember.js](https://www.emberjs.com/), and [Knockout.js](https://knockoutjs.com/). Towards the end of that year and the beginning of 2014, a lot of chatter on the internet was around these frameworks / libraries and the fact that they were not “enterprise-ready” because they had performance issues that reared their ugly heads whenever you got to a medium-scale application. This was the first major driver of people to the React ecosystem.

The second major driver of developers and companies to the React ecosystem was the announcement from the Angular team at Google that they would be re-writing the Angular framework from the ground-up. This upset a LARGE number of developers (including myself) and companies who had invested tremendous amounts of time and money into learning and backing the Angular.js framework, just to be told that they would need to completely re-tool their entire front-end development stack. Not only would they need to learn the new syntax changes for the core framework, but they would also need to learn [TypeScript](https://www.typescriptlang.org/) and [RxJS](https://rxjs.dev/). Another major change was the introduction of [Webpack](https://webpack.js.org/) and all of the new ES2015 updates. Combine all of those changes with the fact that the Angular team has documented that they will [release a breaking change (however small) to their framework every 6 months](https://angular.io/guide/releases). If you agree with my initial argument of this article, then you will realize that all of these changes are a huge barrier to adoption of the new Angular framework. On the other hand, the React team has taken the opposite approach by documenting that they [“…value API stability…\[and are\] reluctant to change public APIs or behavior.”](https://reactjs.org/docs/design-principles.html)

### Correlation does not imply causation…

Now that you have seen my own perceptions / suspicions, there is one more thing I must state. All of this is only a hypothesis and I must admit one thing I learned studying statistics: [correlation does not imply causation](https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation). There really is no way for me to prove my hypothesis, so I guess it will always stay a hypothesis.

If you’re still reading this, I appreciate your time and I would love to have a dialog with you to hear your opinion. Feel free and comment below or reach out to me on [Twitter](https://twitter.com/shanetarleton)!
