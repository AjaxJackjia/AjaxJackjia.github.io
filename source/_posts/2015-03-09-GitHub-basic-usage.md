title: "GitHub使用初探"
date: 2015-03-09 17:09:23
category: 
- 版本控制 
tags:
- git
---

之前申请了GitHub账号，一直都没怎么利用起来。现在开始好好整一下博客，顺便把git的相关知识学一下。

<!-- more -->

下面说一下如何在GitHub上管理代码：

## 1. 注册账户以及创建仓库；

## 2. 安装GitBash

这个主要是用来管理git项目的，个人比较习惯里面的命令行窗口。

## 3. 配置Git

Git是分布式的代码管理工具，远程的代码管理是基于SSH的，所以要使用远程的Git则需要SSH的配置。

### 3.1 设置Git的user name和email；

<pre><code class="language-git">
$ git config --global user.name "XXXX"
$ git config --global user.email "XXXX"
</code></pre>

### 3.2 进入到~，查看是否有.ssh目录，有则备份；

### 3.3 在本地创建ssh key，一路回车，最后得到两个文件：id_rsa和id_rsa.pub；

<pre><code class="language-git">
$ ssh-keygen -t rsa -C "your_email@youremail.com"
</code></pre>

### 3.4 进入到github的account settings，在SSH Keys选项中，加入id_rsa.pub文件中的key。

为了验证成功，在git bash输入如下命令；

<pre><code class="language-git">
$ ssh -T git@github.com
</code></pre>

如果是第一次的会提示是否continue，输入yes就会看到：You’ve successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。

### 3.5 进入到需要上传的repo（如果没有则用git init来创建），然后添加远程地址：

<pre><code class="language-git">
$ git remote add origin git@github.com:yourName/yourRepo.git
</code></pre>

后面的yourName和yourRepo表示你在github的用户名和在github上新建的仓库，加完之后进入.git，打开config，这里会多出一个remote "origin"内容，这就是刚才添加的远程地址，也可以直接修改config来配置远程地址。

## 4、提交、上传

<pre><code class="language-git">
$ git pull origin master	//同步本地与git服务器
$ git add README		    //添加README到工作区
$ git commit			    //提交到本地版本库
$ git push origin master	//将本地版本库推送到git服务器
</code></pre>

## 5、.gitignore文件

.gitignore顾名思义就是告诉git需要忽略的文件，这是一个很重要并且很实用的文件。一般我们写完代码后会执行编译、调试等操作，这期间会产生很多中间文件和可执行文件，这些都不是代码文件，是不需要git来管理的。我们在git status的时候会看到很多这样的文件，如果用git add -A来添加的话会把他们都加进去，而手动一个个添加的话也太麻烦了。这时我们就需要.gitignore了。例如为了让Git忽略bin文件夹，在主目录下放置.gitignore文件，其中内容为bin。

<pre><code class="language-git">
#忽略的特定文件以及文件夹
bin
.project
</code></pre>

以上主要是搭建和使用github的基本操作，git还有很多实用的技巧。详情请移步[Git官方文档](http://git-scm.com/doc)。


##参考文章：
[http://www.eoeandroid.com/thread-274556-1-1.html](http://www.eoeandroid.com/thread-274556-1-1.html)
[http://blog.csdn.net/hustpzb/article/details/8230454/](http://blog.csdn.net/hustpzb/article/details/8230454/)

--EOF--
