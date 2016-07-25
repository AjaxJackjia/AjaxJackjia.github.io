title: linux指令之netstat
toc: true
date: 2016-07-26 01:00:55
category:
- Linux
tags:
- linux command
---

# netstat

## 命令作用

netstat命令用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。netstat是在内核中访问网络及相关信息的程序，它能提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。

<!--more-->

## 命令格式

`# netstat [-acCeFghilMnNoprstuvVwx][-A<网络类型>][--ip] `

## 命令参数

-a或–all === 显示所有连线中的Socket。
-A<网络类型>或–<网络类型> === 列出该网络类型连线中的相关地址。
-c或–continuous === 持续列出网络状态。
-C或–cache === 显示路由器配置的快取信息。
-e或–extend === 显示网络其他相关信息。
-F或–fib === 显示FIB。
-g或–groups === 显示多重广播功能群组组员名单。
-h或–help === 在线帮助。
-i或–interfaces === 显示网络界面信息表单。
-l或–listening === 显示监控中的服务器的Socket。
-M或–masquerade === 显示伪装的网络连线。
-n或–numeric === 直接使用IP地址，而不通过域名服务器。
-N或–netlink或–symbolic === 显示网络硬件外围设备的符号连接名称。
-o或–timers === 显示计时器。
-p或–programs === 显示正在使用Socket的程序识别码和程序名称。
-r或–route === 显示Routing Table。
-s或–statistice === 显示网络工作信息统计表。
-t或–tcp === 显示TCP传输协议的连线状况。
-u或–udp === 显示UDP传输协议的连线状况。
-v或–verbose === 显示指令执行过程。
-V或–version === 显示版本信息。
-w或–raw === 显示RAW传输协议的连线状况。
-x或–unix === 此参数的效果和指定”-A unix”参数相同。
–ip或–inet === 此参数的效果和指定”-A inet”参数相同。

## 实例

### 实例1

`# netstat`
![netstat-1](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-1.png)

Active Internet connections，称为有源TCP连接，其中"Recv-Q"和"Send-Q"指的是接收队列和发送队列。这些数字一般都应该是0。如果不是则表示软件包正在队列中堆积。这种情况只能在非常少的情况见到。

Active UNIX domain sockets，称为有源Unix域套接口(和网络套接字一样，但是只能用于本机通信，性能可以提高一倍)。Proto显示连接使用的协议；RefCnt表示连接到本套接口上的进程号；Types显示套接口的类型；State显示套接口当前的状态；Path表示连接到套接口的其它进程使用的路径名。

> ** 套接口类型 **
-t ：TCP
-u ：UDP
-raw ：RAW类型
--unix ：UNIX域类型
--ax25 ：AX25类型
--ipx ：ipx类型
--netrom ：netrom类型

> ** 状态说明 **
LISTEN：侦听来自远方的TCP端口的连接请求
SYN-SENT：再发送连接请求后等待匹配的连接请求（如果有大量这样的状态包，检查是否中招了）
SYN-RECEIVED：再收到和发送一个连接请求后等待对方对连接请求的确认（如有大量此状态，估计被flood攻击了）
ESTABLISHED：代表一个打开的连接
FIN-WAIT-1：等待远程TCP连接中断请求，或先前的连接中断请求的确认
FIN-WAIT-2：从远程TCP等待连接中断请求
CLOSE-WAIT：等待从本地用户发来的连接中断请求
CLOSING：等待远程TCP对连接中断的确认
LAST-ACK：等待原来的发向远程TCP的连接中断请求的确认（不是什么好东西，此项出现，检查是否被攻击）
TIME-WAIT：等待足够的时间以确保远程TCP接收到连接中断请求的确认
CLOSED：没有任何连接状态

### 实例2

`# netstat -nt  //显示当前TCP连接情况`
![netstat-2](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-2.png)

### 实例3

`# netstat -pt    //显示TCP端口号的使用情况`
![netstat-3](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-3.png)

### 实例4

`# netstat -l    //显示监听的套接字`
![netstat-4](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-4.png)

### 实例5

`# netstat -r    //显示关于路由表的信息`
![netstat-5](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-5.png)

### 实例6

`# netstat -nat | awk '{print $6}' | sort | uniq -c | sort -rn    //按状态进行数量统计并排序`
![netstat-6](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-netstat-6.png)


## 参考

http://www.cnblogs.com/peida/archive/2013/03/08/2949194.html

