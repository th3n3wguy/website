---
title: "Why I include Lodash in (almost) every project…"
description: "Now that we got that over with, here is the TLDR of why I always include the Lodash library in (almost) all of my web development projects:"
pubDate: 2019-01-28
tags: ["JavaScript","Lodash","Functional programming"]
sourceUrl: "https://medium.com/@th3n3wguy/why-i-include-lodash-in-almost-every-project-a3f72c95006d"
draft: false
---

* * *

<img src="../../images/blog/why-i-include-lodash-in-almost-every-project-1.jpg" alt="Illustration from “Why I include Lodash in (almost) every project…”">

Now that we got that over with, here is the TLDR of why I always include the [Lodash](https://lodash.com/) library in (almost) all of my web development projects:

-   Assumption #1: Functional-style code is easier to understand than imperative-style code
-   Assumption #2: Native functions have “gotchas”
-   Assumption #3: The `.chain()` method is the real beauty of the library
-   Assumption #4: Execution performance is less important than code readability / maintainability (most of the time)

Take a quick look around Medium and you can find hundreds of articles that people have published describing the pitfalls, problems, and beauty of the JavaScript language. Over the last 10+ years of working in JavaScript, I have learned a lot of lessons the hard way. There were two key points in time when I gained a massive leap forward as a “UI Developer”. The first was when I started doing unit testing with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/). The second was when I discovered how to use [Lodash](https://lodash.com/) and the beauty of the `_.chain()` and other functional programming concepts that came along with it.

### What is Lodash?

I won’t go too deep here, but [the tagline from their website](https://lodash.com/) describes it as `A modern JavaScript utility library delivering modularity, performance & extras.` Essentially, it is everything that you wish that JavaScript had built into the prototype. Not to leave it out here, but [Underscore.js](https://underscorejs.org/) is another versatile utility library and was the inspiration for [Lodash](https://lodash.com/).

### Why do I need it for my project?

<img src="../../images/blog/why-i-include-lodash-in-almost-every-project-2.jpg" alt="Illustration from “Why I include Lodash in (almost) every project…”">

First, you don’t NEED it. I don’t NEED to include it in every project that I touch. There are some smaller projects I have worked on which have not required such a heavy library or are nearly complex enough to justify including it as a dependency. But when I know that an application is going to be complex and will handle complex data structures / UI interactions / functionality, then it is the first library that I include. My theory is this: *it does not matter whether the UI is built with* [*jQuery*](https://jquery.com/)*,* [*Vue.js*](https://vuejs.org/)*,* [*Angular.js*](https://angularjs.org/)*,* [*Angular*](https://angular.io/)*, or* [*React*](https://reactjs.org/)*, the core of the library and the functionality and safety brought to any project is worth considering.* Now that I have given a lot of my own personal opinions, let us go over some examples that support my theory.

### Assumption #1: Functional-style code is easier to understand than imperative-style code

One thing that you find yourself starting to do whenever you use a library like Lodash with a `_.chain()` method or something similar is finding a functional programming-style approach to your codebase. Let’s take a quick look at two different examples of code. Let’s say that we want to create a new array with the list of ids from a current array of objects:

```javascript
// Array that we are going to re-use across each example.
const currentArr = [
  { id: 1, name: 'Name1' },
  { id: 2, name: 'Name2' },
  { id: 3, name: 'Name3' }
];
```

```javascript
// Imperative programming approach (best performance)
let newArr;
let i = 0;
const currentArrLength = currentArr.length;
```

```javascript
for (i = 0; i < currentArrLength; i++) {
  newArr.push(currentArr[i].id);
}
```

```javascript
// Functional programming approach using native JavaScript
let newArr = currentArr.map((obj) => obj.id);
```

```javascript
// Functional programming approach with Lodash
let newArr = _.map(currentArr, (obj) => obj.id);
```

Now, as we can see from this very simple example (we are trying to get all of the `.id` values from each object into a new array. I will let you decide which code you would prefer, based on your development style, but this example exists to re-iterate my point: functional-style code is easier to understand than imperative-style code. At this point, you are probably thinking something along these lines: `Well, if there is a native .map() function, then why don't we just use that, rather than including a library?` If you’re not, I don’t really want to guess what you’re thinking because it doesn’t fit my agenda here, so let’s move on.

### Assumption #2: Native functions have “gotchas”

What do I mean by “gotchas”? Let’s take the following native code as an example:

```javascript
// Let's assume that we either haven't defined "myArray" previously, or the value was set to "null".
```

```javascript
let newArray = myArray.map((val) => `${val`);
```

Do you know what this will give you? Here are the exceptions you will likely encounter during run-time:

```javascript
// ...when you do not define the "myArray" variable as an array before the function was invoked.
Uncaught ReferenceError: myArray is not defined
```

```javascript
// ...when the "myArray" variable was set to null before the function was invoked.
Uncaught TypeError: Cannot read property 'map' of null
```

Now, if we were to use the Lodash `.map()` function instead, we would actually not get a single run-time exception. Instead, the value of the `newArray` variable would now be an empty array. Now, while this is not completely the expected behavior, since technically it could be seen as a failure, the Lodash function is easier to predict. This is due to the fact that the Lodash function will ALWAYS return an array, regardless of the input. You should always be the judge of which option is best for your situation.

### Assumption #3: The `.chain()` method is the real beauty of the library

You have seen some very simple examples of code, but we all know that is not how the real-world works. That being said, let’s take some time and review a complicated problem and compare the different solutions.

**Problem:** You have two arrays of objects, where each object contains a unique ID, and you need to compare them to determine which objects exist within BOTH arrays.

```javascript
// Setup for examples.
const firstArray = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 }
];
const secondArray = [
  { id: 5},
  { id: 3 },
  { id: 2 }
];
```

```javascript
// Native approach
const duplicateValues = [];
```

```javascript
for (let i = 0; i < firstArray.length; i++) {
  for (let j = 0; j < secondArray.length; j++) {
    if (
      firstArray[i].id === secondArray[j].id
      && !duplicateValues.map((val) => val.id).includes(firstArray[i].id)
    ) {
      duplicateValues.push(firstArray[i]);
    }
  }
}
```

```javascript
// Lodash approach
const duplicateValues = _.chain(firstArray)
  .intersectionBy('id')
  .uniqBy('id')
  .value();
```

Now, one thing to consider here is that I am not considering performance. You can look at [this JSPerf test I created](https://jsperf.com/duplicate-objects-in-arrays-native-vs-lodash) to see that the native approach SIGNIFICANTLY outperforms the Lodash approach. When using the Lodash library, you have to take into account that performance will ALWAYS be slower than native methods, simply for the fact that you are trading performance for readability / maintainability. This leads me to my last assumption:

### Assumption #4: Execution performance is less important than code readability / maintainability (most of the time)

By this point, you have read multiple examples of where the Lodash library is able to help you make your code easier to read, understand, and maintain (assuming that you spend a little bit of time learning the methods available). The main point that I always end up coming back to in a debate on this topic is `the Lodash methods are ALWAYS slower than the native methods and add additional overhead to the application's load-time or run-time execution.`This is 100% true and it can not be overlooked. If you have an application where you need to tweak and squeeze every last bit of performance out of an application, then you will NEVER use the Lodash library. For those of you who fall into this category of applications, I wish you the best of luck and appreciate you taking the time to read this entire article.

For most of you out there reading this article, I urge you to realize that clean, readable code is more important than efficient / high-performing code. If you don’t believe me, then do your own research as to why I have this belief. Here are a few articles / discussions that I will leave you to get started:

-   [https://www.techrepublic.com/blog/software-engineer/why-clean-code-is-more-important-than-efficient-code/](https://www.techrepublic.com/blog/software-engineer/why-clean-code-is-more-important-than-efficient-code/)
-   [https://softwareengineering.stackexchange.com/questions/111021/why-do-so-many-developers-believe-performance-readability-and-maintainability](https://softwareengineering.stackexchange.com/questions/111021/why-do-so-many-developers-believe-performance-readability-and-maintainability)
-   [https://medium.com/@galute64/brilliant-code-vs-maintainable-code-45915a64989f](https://medium.com/@galute64/brilliant-code-vs-maintainable-code-45915a64989f)

If you are still with me, I want to thank you for taking the time to read this article and I hope that you found some of the information within it valuable. I wish you the best of luck in all your endeavors and look forward to interacting with anyone who wishes to comment below.
