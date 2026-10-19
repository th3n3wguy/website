---
title: "Data Scientists…what do you mean that you’re not “programmers”?"
description: "You don’t “write code,” or do you…"
pubDate: 2020-08-19
tags: ["Data science","Software engineering"]
sourceUrl: "https://medium.com/@th3n3wguy/data-scientists-what-do-you-mean-that-youre-not-programmers-7085cd779902"
draft: false
---

*You don’t “write code,” or do you…*

* * *

<img src="../../images/blog/data-scientists-what-do-you-mean-that-youre-not-programmers-1.jpg" alt="Photo by Kevin Ku on Unsplash">

Photo by [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

## My Introduction to Data Science

A few years ago, I was introduced to some real-world implementations of [Machine Learning](https://en.wikipedia.org/wiki/Machine_learning). The concept of “Machine Learning” and “Artificial Intelligence” has been around for as long as I can remember (granted, I have only been programming seriously for ~10 years now). They were simple explanations but they were attempting to provide solutions to real-world problems that were occurring in our space. As I write, I do not remember the problems or solutions that were presented, but I do remember one thought blaring in the back of my mind:

> That is interesting and should’ve started with Machine Learning yesterday.

Little did I know, I was in for a whirlwind of humility ready to fling me back in time to the feelings I felt during my Introduction to Java Programming class at [UTPB](https://www.utpb.edu/academics/programs/computer-science/bs-computer-science). Even simple [DuckDuckGo searches for “introduction to machine learning”](https://duckduckgo.com/?t=ffab&q=introduction+to+machine+learning&atb=v188-1&ia=web) came up with an overwhelming amount of information, online tutorials, online paid courses, and even boot camps (e.g. [CodeUp](https://codeup.com/ds-course-catalog/)). All of them offering a treasure-trove of information. After spending a few weeks going through tutorials and online demos, I still felt as though I was still back at square-one when trying to comprehend just the terminology. Alas, I deferred to focusing back on growing my current skill-set and leave the data science to others. Soon thereafter, I would find myself back in the world of data science in a slightly different manner.

## More Flashbacks To Come

In August 2019, I made the choice to join an amazing group of people at [Quickpath](https://www.quickpath.com/) as a Platform Architect. It was an incredible opportunity for me because I was given the unique opportunity to lead the design and development of a unique platform that exists nowhere else in the industry, the [Quickpath Platform](https://www.quickpath.com/platform-overview) (if you want to learn more, [reach out to me on LinkedIn](https://www.linkedin.com/in/shanetarleton/)). Over the last year, I have been able to learn a tremendous amount of information on what a “day-in-the-life-of” a data scientist looks like, as well as how they approach many different problems. While I still don’t fully understand all of the implementations of Machine Learning, I have learned so much more than I ever thought I would just a few years ago. With all of these interactions, I have realized a single thing that has remained true since I worked as an Undergraduate Research Assistant for the [Data-Intensive Scalable Computing Laboratory](https://discl.cs.ttu.edu) under [Dr. Yong Chen](https://www.myweb.ttu.edu/yonchen/) at [Texas Tech University](http://www.depts.ttu.edu/cs/):

> Scientists are incredible with analyzing and finding new insights in data, but many are entry-level software engineers when it comes to writing code.

I have spent the last few months combing through quite a few different Machine Learning projects from both [GitHub searches](https://github.com/topics/scikitlearn-machine-learning) to code provided to me personally by a few data scientists for my understanding. This is when the flashbacks started. While some projects are more organized than others, they all shared a commonality that reminded me of my time working in the [Scientific Computing](https://en.wikipedia.org/wiki/Scientific_programming_language) community during college: the code produced is hard to read, hardly-ever commented, the only logging is often “***print***” statements, and is often implemented in a single or very-few files that can easily reach 1k+ lines of code. This style of programming is reminiscent of most entry-level programmers I have mentored over the years.

## Scientists Are Not Software Engineers

No, and for good reason. I attempted to get into the world of [linear regression](https://en.wikipedia.org/wiki/Linear_regression), [logistic regression](https://en.wikipedia.org/wiki/Logistic_regression), [Naive Bayes classification](https://en.wikipedia.org/wiki/Naive_Bayes_classifier), [KNN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm), and more and was quickly overwhelmed. Now let us throw in that they have to understand the frameworks that are available in their provided programming language of choice (e.g. Python): [TensorFlow](https://www.tensorflow.org/), [SciKit-Learn](https://scikit-learn.org), [Keras](https://keras.io/), [Predictive Model Markup Language (PMML)](https://en.wikipedia.org/wiki/Predictive_Model_Markup_Language), and many more. Can you expect any person to know all of that functionality, as well as all of the things that we have to know as software engineers (e.g. RESTful APIs, database modeling, multiple programming languages, implementing authentication & authorization, etc.)? I wouldn’t and neither should you.

A data scientist’s value is so much more than the code they can produce. We should be allowing all data scientists to focus on what they are good at producing (the data research, model training, and tuning, etc.). It is our responsibility as software engineers and companies, such as [Quickpath](https://www.quickpath.com), to find repeatable, manageable, and scalable solutions to get data scientist solutions into our “production” environments.

I remember having a conversation I had with one of my favorite professors at Texas Tech University, [Dr. J. Nelson Rushton](http://www.depts.ttu.edu/coe/dean/faculty/faculty.php?name=J.%20Nelson%20Rushton). During this discussion, I asked him to explain the difference between a “computer scientist” a “computer engineer”. I am going to paraphrase this as it has been ~8–9 years since I spoke to him about this:

> There are 3 types of people in this world. The first of these are scientists. These types of people think about and discover all of the natural laws around us. They don’t usually have an interest in creating things in our natural world, only imparting the newly-discovered things to others. These people generally make the best teachers because their entire drive is to learn and teach. The second of these are engineers. These types of people take the concepts that scientists have discovered and created amazing things from them. They don’t have an interest in why or how the scientist came up with these concepts, only how they can create something tangible that be used in our world. These types of people generally become the ones who create all of the amazing software, hardware, cars, bridges, and every other piece of things we use today. The last of these are technicians. These types of people take the things that have been built and maintain them. You interact with more of these people regularly than you realize: plumbers, electricians, building contractors, and so many others. If it weren’t for these people, the stuff that scientists dream up and engineers design and build would crumble around us. Each plays a vital role in our world.

## Who Cares If The Code Works?

If you are or were a software engineer, you have likely lost count of the number of times you heard someone say or asked this question. Regardless of your feelings towards this question, there is one thing that you should be aware of when you hear it: [technical debt](https://en.wikipedia.org/wiki/Technical_debt). If you are reading this as a scientist, you may have never heard of this concept before now and possibly even wondering why it matters to you. I might not know how your mind works when you’re designing and tweaking your data models based on your findings, but I do know how versioning code and data over time tend to go if you don’t pay attention. If you‘re still writing data models and not using [Git](https://git-scm.com/), [Subversion](https://subversion.apache.org/), or even [Data Version Control](https://dvc.org/), then you are likely doing something akin to this meme:

<img src="../../images/blog/data-scientists-what-do-you-mean-that-youre-not-programmers-2.png" alt="https://www.reddit.com/r/ProgrammerHumor/comments/72rki5/the_real_version_control/">

[https://www.reddit.com/r/ProgrammerHumor/comments/72rki5/the\_real\_version\_control/](https://www.reddit.com/r/ProgrammerHumor/comments/72rki5/the_real_version_control/)

If you are using multiple folders to manage the versions of your models and data, then you are not alone. This is a common occurrence I have seen, especially when a data scientist is just starting and trying to determine the framework, algorithm, and even data to be used to train the model to run the predictions. At first, it seems like an easy way to approach the problem. You’re just “prototyping” and testing out your theory at the moment, right? Well, that’s the same thing we do as software engineers.

The difference is that we, as software engineers, have learned over the years that saving different “versions” or changes of our code in separate folders causes problems for us. For example, “versioned folders” do not help us understand when we make a change, realize that we want to revert it, realize we have no idea what was changed, and then come to the conclusion that it is likely near-impossible to get back to that previous point in time. These realizations are exactly why tools like [Git](https://git-scm.com/) and processes such as [Git Flow](https://www.gitflow.com/) and [Semantic Versioning](https://semver.org/) have become a foundational principle for us as software engineers.

## What Do You Suggest I Do?

Before I get started, I am going to be referencing the “master” branch of Git quite a few times in the following section. Please know that I am not using this in any sort of derogatory manner, as I am 100% aware of and stand behind the idea to rename all “master” branches to something else. As an example, [GitHub has announced that they are making a massive effort to abandon “master” as their primary protected branch in their repositories](https://www.bbc.com/news/technology-53050955). Even the most recent release of Git (v2.28.0 as of this writing) has announced [a configuration when creating a new repository to specify a default branch name of your choosing](https://github.blog/2020-07-27-highlights-from-git-2-28/).

I will remind you that I am not a data scientist, as if that were not already apparent. My suggestion is for you to use a version control system for your code AND data. I have seen some examples where data scientists will attempt to use Git only for their code and keep their data separate and this has been a mistake every single time. Unlike a software engineer, your data is just as important, if not MORE important, as your source code when you are attempting to train or re-train a Machine Learning model. There are two approaches to using Git that I have seen used in the past.

### Git Flow

The first (my personal favorite) follows the [Git Flow](https://www.gitflow.com/) process using [Git](https://git-scm.com/). In this process, while you are doing your initial design of your models, you are creating branches from the “develop” branch (one of the 2 “protected” branches) of your Git repository. When you decide that you want to make a change to the model or data, you simply create a new branch from the “develop” branch, commit your changes, and then merge those changes back into the “develop” branch. You keep following this pattern until you have a trained model that you believe is ready for final validation/testing. At that point, you create a “release” branch where you will do final validation, testing, and bug fixes to your model. When you feel as though it is ready for “production”, then you merge the release branch into your “master” branch (the other “protected” branch) and create a tag that follows [Semantic Versioning guidelines](https://semver.org/). Here is a quick visualization that might help you understand it better if you are a visual person like myself:

<img src="../../images/blog/data-scientists-what-do-you-mean-that-youre-not-programmers-3.gif" alt="Image depicting the process for managing source code using the Git Flow process model.">

[https://jeffkreeftmeijer.com/images/gitflow.gif](https://jeffkreeftmeijer.com/images/gitflow.gif)

### GitHub Flow

The second option (my least favorite) is the [GitHub Flow](https://guides.github.com/introduction/flow/) process using [Git](https://git-scm.com/). In this process, you start from the “master” branch and you create all of your branches (fixes, features, releases, etc.) from there. Once you have made all of the changes you wish to make on your model and/or data, then you test / validate that model similar to the same way you would test/validate the “release” branches created in the Git Flow process. Once you are sure that the changes are ready to go to “production”, then you merge your changes into the “master” / “main” branch of your repository.

From there, I have seen some people use tags on every merge into their “master” branch, as well as some people that only choose to create tags on commits when they truly believe that the trained data model is ready for “production.” The second scenario allows you to do final testing and validation of a model when combined with changes from other data scientists and developers (a.k.a. [integration testing](https://en.wikipedia.org/wiki/Integration_testing)) before releasing to “production.” Here is a visualization to help you understand the concept if you are more of a visual person like myself:

<img src="../../images/blog/data-scientists-what-do-you-mean-that-youre-not-programmers-4.png" alt="Visualization of the GitHub Flow process.">

[https://arccwiki.uwyo.edu/images/1/19/GitHub\_Flow\_steps.png](https://arccwiki.uwyo.edu/images/1/19/GitHub_Flow_steps.png)

## To Production…and beyond!

Deploying a Machine Learning model to “production” is such a hot topic that even [VentureBeat recently reported that 87% of Machine Learning models never make it into production](https://venturebeat.com/2019/07/19/why-do-87-of-data-science-projects-never-make-it-into-production/). Those that do are generally not repeatable or scalable across a large array of teams. As an example, here are just a few of them that have been discussed online:

-   [https://towardsdatascience.com/take-your-machine-learning-models-to-production-with-these-5-simple-steps-35aa55e3a43c](https://towardsdatascience.com/take-your-machine-learning-models-to-production-with-these-5-simple-steps-35aa55e3a43c)
-   [https://towardsdatascience.com/challenges-deploying-machine-learning-models-to-production-ded3f9009cb3](https://towardsdatascience.com/challenges-deploying-machine-learning-models-to-production-ded3f9009cb3)
-   [https://medium.com/analytics-vidhya/machine-learning-models-to-production-72280c3cb479](https://medium.com/analytics-vidhya/machine-learning-models-to-production-72280c3cb479)
-   [https://blog.cloudera.com/putting-machine-learning-models-into-production/](https://blog.cloudera.com/putting-machine-learning-models-into-production/)
-   [https://informationweek.com/big-data/ai-machine-learning/a-path-from-pilot-to-machine-learning-production/d/d-id/1335964](https://informationweek.com/big-data/ai-machine-learning/a-path-from-pilot-to-machine-learning-production/d/d-id/1335964)

The hottest topic I have seen going around recently is the concept of “MLOps” ([read more at Wikipedia](https://en.wikipedia.org/wiki/MLOps)). Again, this goes back to my statement above on how we, as software engineers and companies, should be focused on determining the right solution for repeatable, manageable, and scalable methods of moving data scientist solutions (i.e. models) into production.

Even when you can deliver your Machine Learning model to production, we all know that there is so much more to deriving true business value out of a model than just providing input to and retrieving the output from a model. So many questions start appearing at this point:

-   How do I get access to data to be provided as input features when executing my model?
-   What am I supposed to do with the output predictions?
-   What actions am I supposed to take based on the business rules around the predictions?
-   Where do I store those predictions associated with the provided inputs so I can analyze the run-time executions of my model?
-   How do I deal with releasing a new “version” of my ML model without breaking production?

These are just a few of the questions that are solved easily with the introduction of Applied Intelligence platforms, such as the [Quickpath Platform](https://www.quickpath.com/platform-overview). Providing the ability to manage the model deployment, run-time metadata/logs, and business rules determining business decisions are a few of the reasons why these types of platforms are growing in today’s world.

## But wait, there’s more?

That is all, for now. I will make other posts in the future to help disseminate some of the information I have learned when trying to help data scientists move models from source control to usable and executable in a production-grade environment. Here are a few ideas for future topics that I have bouncing around in my head. Respond below and let me know which ones you would like to know more about (or even suggest your own) and I will prioritize based on your responses!

1.  I have a model ready for use in production, by my application teams don’t know how to integrate it into their <insert programming language here> web applications. Help!
2.  My IT organization wants me to do CI/CD for my project. What does that mean?
3.  A developer told me that Git is a terrible place to store my <insert 1GB+ file size> model because it is terrible with storing large files. What do I do now?
