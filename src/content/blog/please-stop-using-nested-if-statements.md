---
title: "Please stop using nested if statements."
description: "Remove the nesting and use ternaries instead."
pubDate: 2022-02-22
tags: ["JavaScript","Code readability"]
sourceUrl: "https://medium.com/@th3n3wguy/please-stop-using-nested-if-statements-bf3da0664a7c"
draft: false
---

* * *

### Remove the nesting and use ternaries instead.

<img src="../../images/blog/please-stop-using-nested-if-statements-1.jpg" alt="Image of code on a notebook screen.">

Photo by [Marc Mueller](https://unsplash.com/@marcmll?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

> [It is harder to read code than to write it.](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/)  
>  — Joel Spolsky

I can’t tell you how many times I have run across something like this:

```javascript
function getDocuments(onlyWord) {
  if (onlyWord) {
    if (isAdministrator) {
      return getWordDocumentsAsAdmin();
    }
    else {
      return getWordDocumentsForCurrentUser();
    }
  }
  
  return getAllDocumentsForCurrentUser();
}
```

[Original gist: getDocuments\_nestedIf.js](https://gist.github.com/th3n3wguy/3e85857899595c9bd9ee8d103d88bf65/raw/d3bb715ec13b06c97a4633e91666e91fceb4fc34/getDocuments_nestedIf.js)

While this is a simple example, let’s rewrite this and take out the nested if statements:

```javascript
function getDocuments(onlyWord) {
  if (onlyWord && isAdministrator) {
    return getWordDocumentsAsAdmin();
  }
  else if (onlyWord) {
    return getWordDocumentsForCurrentUser();
  }
  
  return getAllDocumentsForCurrentUser();
}
```

[Original gist: getDocuments\_nonNestedIf.js](https://gist.github.com/th3n3wguy/5c8858d7cb94a112e3df2b19f55e5c0a/raw/a490286443b8148b875e095596bc81f49e0d84ef/getDocuments_nonNestedIf.js)

That’s better. Now, we can get a better understanding of when each function call is returned, but I think we can easily do better. Let’s try and turn this into a ternary statement and keep the nesting out:

```javascript
function getDocuments(onlyWord) {
  return onlyWord && isAdministrator ? getWordDocumentsAsAdmin()
    : onlyWord ? getWordDocumentsForCurrentUser()
    : getAllDocumentsForCurrentUser();
}
```

[Original gist: getDocuments\_ternary.js](https://gist.github.com/th3n3wguy/1f582e4829106d389e9682b9795d78a6/raw/4ef4458a3c41daf366b23cbaac93d9b74b6556b4/getDocuments_ternary.js)

If you don’t agree with me, that is okay. Everyone is allowed to write code how they see fit and this is absolutely NOT a one-size-fits-all and won’t work in every situation. I would love to hear your thoughts!
