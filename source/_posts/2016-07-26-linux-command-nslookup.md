title: linux指令之nslookup
toc: false
date: 2016-07-26 00:41:34
category:
- Linux
tags:
- linux command
---

# nslookup

## 命令作用

nslookup命令是常用域名查询工具，就是查DNS信息用的命令。 

nslookup有两种工作模式，即“交互模式”和“非交互模式”。在“交互模式”下，用户可以向域名服务器查询各类主机、域名的信息，或者输出域名中的主机列表。而在“非交互模式”下，用户可以针对一个主机或域名仅仅获取特定的名称或所需信息。 

进入交互模式，直接输入nslookup命令，不加任何参数，则直接进入交互模式，此时nslookup会连接到默认的域名服务器（即/etc/resolv.conf的第一个dns地址）。或者输入`nslookup nameserver/ip`。进入非交互模式，就直接输入nslookup域名就可以了。

<!--more-->

## 命令格式

`# nslookup (选项) (参数)`

## 命令选项

-sil：不显示任何警告信息。

## 命令参数

域名：指定要查询域名。

## 实例

`# nslookup wx.qq.com`

![nslookup显示](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-nslookup.png)

## 参考

http://man.linuxde.net/nslookup
