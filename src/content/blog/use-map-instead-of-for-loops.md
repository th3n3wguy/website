---
title: "Use map() instead of for() loops"
description: "Functional programming in JavaScript is your friend"
pubDate: 2022-02-24
tags: ["JavaScript","Functional programming"]
sourceUrl: "https://medium.com/@th3n3wguy/please-use-map-instead-of-for-loops-5a2f54f088c8"
draft: false
---

* * *

### Functional programming in JavaScript is your friend

<img src="../../images/blog/use-map-instead-of-for-loops-1.jpg" alt="Illustration from “Use map() instead of for() loops”">

### Pre-Requisite Knowledge

Before I get started, this is going to teach you how the `.map()` function works. If you only have knowledge of `for()` loops in JavaScript, this article will require you to understand the [Arrow Function Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax (a.k.a. “fat arrow” functions).

*If there is enough demand, I can create a separate tutorial to explain those further. Let me know in the comments.*

### Let’s Get Started

Oh, how I long for the days when learning a `for` loop was a foreign concept to me. Those were simple times back before trying to take programming concepts and data structures and turn them into usable, real-world software.

But I digress.

* * *

In every programmer’s career, there is a point in time where we were taught that [Imperative Programming](https://en.wikipedia.org/wiki/Imperative_programming) (usually as a precursor to [Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)) was *the* definitive method of building usable software.

In some cases, such as mine, you slowly begin to change your perception of such things. My perceptions and “programming style” have morphed ever since a friend introduced me to functional programming around 6 years ago.

I do not claim to fully-understand [Monads](https://en.wikipedia.org/wiki/Monad_%28functional_programming%29) or some of the other concepts from that paradigm, but one thing has become clear to me:

> Pure functions make code significantly-easier to read and write automated tests against.

Alright, enough talk. Let’s get into some actual code, shall we?

You’re chugging along with your code and are provided with an array of objects, where each object represents a `Person`. Each `Person` contains 3 properties: `id`, `name`, and `emailAddress`. You need to create an array that contains only the `id` values from each `Person` within the original array.

Here is likely what you wrote, assuming you were using an Imperative Programming approach:

```javascript
let listOfIds = [];

for (let i = 0; i < listOfPeople.length; i++) {
  listOfIds.push(listOfPeople[i].id);
}
```

[Original gist: getIdsFromObjectArray\_forLoop.js](https://gist.github.com/th3n3wguy/771a3a5f9e8eae24cd72b576d5eac037/raw/3faebbc39de2dcfd3ea772264dc4e6f7766f14f2/getIdsFromObjectArray_forLoop.js)

The principle concept that stands out in every similar scenario is this: *you want to create a new array with the exact same length as the previous array, but the data in the new array is different (in some way or another) and you do not want to make any changes to the original array.* You have now discovered the perfect scenario for Functional Programming.

## Array.prototype.map()

Let’s take a look at how we would write the exact same code above using the [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function (not to be confused with the [Map object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)).

```javascript
const listOfIds = listOfPeople.map(person => person.id);
```

[Original gist: getIdsFromObjectArray\_map.js](https://gist.github.com/th3n3wguy/0f7cd70cb81ea5af5910b4a8faf36478/raw/fb34d8f9da00d11be064374ee69458bfe08d8148/getIdsFromObjectArray_map.js)

The first time I saw someone use the `.map()` function as a replacement for how I would’ve written the `for()` loop above, I was lost. There is actually another way that you could write the `.map()` function, which you wouldn’t do in a real-world situation, but it does help explain what is going on here.

```javascript
const listOfIds = listOfPeople.map((person, i) => {
  return listOfPeople[i].id;
});
```

[Original gist: getIdsFromObjectArray\_mapExpanded.js](https://gist.github.com/th3n3wguy/66bfd3f9d7915a131a7b52e30bdca660/raw/8768a020cf10ee6502a19aa073a214963819292b/getIdsFromObjectArray_mapExpanded.js)

Now, I am sure you will recognize the `listOfPeople[i].id` piece of the code here from the `for()` loop example. To explain this further, the `.map()` function is “looping” over each item in the array and assigning the item (i.e. `person` in the second and third examples) and the current index (i.e. `i` in the first and third examples) as parameters to the function that we define.

The `.map()` function requires that the function return a value (i.e. `person.id` in the second example and `listOfPeople[i].id` in the third example) for the index so that it is able to assign that value to the same index in the new array (i.e. `listOfIds`). This is, essentially, the same thing that is being done in the first example when performing the `listOfIds.push(listOfPeople[i].id)` function.

Hopefully this explanation helps someone out there understand this concept a little bit better. If there is anything you think I should change, explain further, or update, then I would love to hear about it in the comments. I wish you well!
