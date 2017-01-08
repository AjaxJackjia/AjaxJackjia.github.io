title: Git工作流之模型管理
toc: true 
date: 2017-01-08 11:34:31
category:
- 版本控制
tags:
- git
- 协同开发
---

> Git是一款优秀的分布式代码管理工具，能够高效地协作开发者之间的开发工作，保证项目高质量完成。
如何使用Git才能达到上述目标呢？我们需要对Git项目的分支进行合理的管理。

最近整理了一篇关于Git开发模型的文章。[这篇文章](http://nvie.com/posts/a-successful-git-branching-model/)介绍了一种非常有效的Git分支管理方法，让开发流程清晰可控，而且比较简单易行。

<!--more-->

## 模型概览图

![Git分支管理模型概览图](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/1-git-model.png)

使用Git的必要性：相比于传统的代码管理工具（SVN等），Git对于分支以及合并有着很好的支持，这些操作是正常工作流中非常高效的管理手段，能够让项目流程透明化，随着开发人员的增多和软件项目的变得更加复杂，开发过程依旧不会混乱。

Git是“分散的”但又是“中心化的”。Git中有一个名为origin的分支，这是所有分支中最基本的，被当作“中心”，开发者可以push和pull。但是每个开发者也可以从其他开发者或者团队那里push或者pull变更来进行协作开发，最终将变化merge到origin中。从这两方面看，Git是分散但中心化的。

![Git是分散但中心化的](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/2-centr-decentr.png)


## 主要分支

两个主要分支：master, develop

`origin/master` 代表 production-ready状态。

`origin/develop` 代表 为下一发布版本准备的携带有若干最新开发变化的状态。当develop分支达到一个稳定版本并且能够发布的时候，develop会将所有变化merge到master分支上，并且会标记一个发布版本号。

对于master分支的commits需要非常严格，因为master上的每个节点都代表一个新的正式版本。

![master和develop分支](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/3-dev-master-branch.png)


## 模型支持的分支

为了支持并行开发，Git模型会支持各种分支，这样会方便组内成员开发、简化版本特性的跟踪、利于版本发布以及线上问题的快速解决。不同于master分支，这些分支都有非常有限的生命周期，最终它们将会被移除。

我们可能用到的不同分支有
* feature分支
* release分支
* hotfix分支

这些分支一点也不特殊，它们的分类取决于我们如何使用它们，它们是Git分支中很普通的成员。

### feature分支

可能始于develop分支，但是一定会被merge到develop分支（或者废弃）；

分支命名规范： 除master、develop、release-*、hotfix-*之外的名字；

feature分支（有时叫做topic分支）通常是用来开发即将到来的新特性或者将来的发布版本，通常只在**开发者repos**中存在，不会出现在orgin中。

![feture分支](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/4-feture-branch.png)

>开始新feature分支

	$ git checkout -b newfeature develop //创建并切换到名为newfeature的特性分支

>结束新feature分支

	$ git checkout develop //切换到develop分支
	$ git merge --no-ff newfeature //merge分支到develop分支
	$ git branch -d newfeature //删除newfeature分支
	$ git push origin develop 

上面merge的--no-ff选项让merge产生一个新的commit在develop分支上，尽管merge可能会产生一个fast-forward。这不会将特性分支的历史commits丢失，反而会将所有commits都添加到分支上。


在`git merge newfeature`命令中，我们是无法在git历史中查看到哪些commits是属于这个特性的，除非查看整个日志信息。在这种情况下恢复fetures（一组commits）也成了一个非常头疼的问题，但是如果选项中加了--no-ff，则会简单很多。

显而易见，`--no-ff`会增加一些commit（有时是空的），但是这些代价比起那些头疼的情况显然要好很多。

![feture分支的--no-ff](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/5-feture-branch-no-ff.png)


### release分支

可能始于develop分支，但是一定会被merge到develop分支和master分支；

分支命名规范：release-*

release分支是为新产品特性做准备的。它们用来做版本发布前的最后工作，并且也可以做少量bug修复和版本发布前的数据准备（版本号、构建状态等）。在release分支上做这些工作，可以让develop分支保持清晰，为下一次版本发布做准备。

>开始新release分支

新的release分支从develop分支分离的时刻是当develop分支已经能够反映产品新特性的时候，但至少要等所有需要发布的产品特性都merge到develop分支。

准确的说，在release分支一开始生成的时候就会被分配一个版本号。在这个时刻之后，develop分支就代表下一个发布的版本了，但是下一个版本的版本号并不能确定（0.3还是1.0）。版本号的确定需要根据项目需要来确定。

    $ git checkout -b release-1.2 develop //从develop分支创建release-1.2分支
    $ ./bump-version.sh 1.2 //文件修改成功，version跳到1.2
    $ git commit -a -m "Bump version number to 1.2"

在创建新分支后，产品跳到了新版本号。这里的bump-version.sh是一个改变working copy中某些文件到新版本的shell脚本。这个脚本也可以被人工取代，然后新的版本号会被提交。

这个新的分支可能会存在一段时间，直到版本被完全推出。在这段时间内，分支上可能会有些bug修复，此时的bug修复并不在develop分支上。此分支上不允许增加比较大的新特性。那些新特性需要merge到develop分支，放在下一个版本推出。

>结束release分支

当release分支准备成为真的发布版本时，需要采取些必要的步骤:

* release分支需要merge到master分支（master分支的每个commit都是一次官方的真正意义上的新特性）；
* master分支上的这次commit为了将来参考必须打上标签；
* release分支上需要重新merge回develop分支，所以将来的发布也可以包含发布过程中的bug修复。


    $ git checkout master
    $ git merge --no-ff release-1.2  // merge到master
    $ git tag -a 1.2 
    $ git checkout develop 
    $ git merge --no-ff release-1.2 // merge到develop

    $ git brach -d release-1.2 // 删除无用分支

    
### hotfix分支

可能始于master分支，但是一定会被merge到develop分支和master分支；

分支命名规范：hotfix-*

hotfix分支非常像为新产品发布的而准备的release分支，但是该分支并不在计划中。它们是从生产环境当前版本不确定状态中产生的。当生产环境中的重大缺陷需要及时修复时，hotfix分支会从当前标记的master分支中产生。

![hotfix分支](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2017/01/6-hotfix-branch.png)

hotfix分支的意义是，团队成员的工作（develop分支）可以继续而不受耽误，并且可以有人迅速处理当前的问题。

>开始hotfix分支

    $ git checkout -b hotfix-1.2.1 master
    $ ./bump-version.sh 1.2.1
    $ git commit -a -m "Bump version number to 1.2.1"
    $ git commit -m "Fixed severe production problem"

**一定要记得在创建分支后增加版本号。**

>结束hotfix分支

当结束时，hotfix分支需要merge到master分支，也需要merge到develop分支，以便能够在后续版本保留补丁。这一点跟发布版本结束时很相似。

    $ git checkout master
    $ git merge --no-ff hotfix-1.2.1 // merge到master分支
    $ git tag -a 1.2.1
    $ git checkout develop 
    $ git merge --no-ff hotfix-1.2.1 // merge到develop分支
    $ git branch -d hotfix-1.2.1 // 删除无用分支

这里有一个**特例**：当release分支已经存在时，hotfix分支需要merge到release分支中，而不是develop分支。


## 总结

上述Git分支管理的分支模型并没有太多的新意，但是这种分支模型在项目中却是非常有效的。它提供了一种非常通用并且易于理解的协同开发方式，这对于提高团队协作很有益处。








