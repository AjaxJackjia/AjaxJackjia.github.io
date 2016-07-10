title: Linux指令之top 
toc: true
date: 2016-07-10 13:54:24
category:
- Linux
tags:
- linux command
---

# top

## 命令作用

动态观察系统进程状况，掌握系统资源现状；显示当前系统正在执行进程的相关信息，包括进程ID、内存占用率、CPU占用率等。

<!--more-->

## 命令参数

-b 批处理
-c 显示完整命令
-I 忽略失效过程
-s 保密模式
-S 累积模式
-i<时间> 设置间隔时间
-u<用户名> 指定用户名
-p<进程号> 指定进程
-n<次数> 循环显示的次数

## top显示进程信息：

![top指令显示进程信息](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-top-info.png)

统计信息区（前五行）：

+ 第一行：任务队列信息，具体如下：

20:31:59 代表 当前时间；
up 355 days， 4:06 代表 系统已运行355天，4小时6分钟（期间没有重启）；
2 users 代表 当前有2个用户登录系统；
load average: 0.20，0.25，0.19 代表 1分钟、5分钟、15分钟的负载情况；
注：load average数据是每隔5秒钟检查一次活跃的进程数，然后按特定算法计算出的数值。如果这个数除以逻辑CPU的数量，结果高于5的时候就表明系统在超负荷运转了。

+ 第二行：Tasks 进程信息，具体如下：

系统现在共有120个进程，其中处于运行中的有1个，119个在休眠（sleep），stoped状态的有0个，zombie状态（僵尸）的有0个。

+ 第三行：CPU状态信息，具体如下：

1.5% us 代表 用户空间占用CPU的百分比；
0.1% sy 代表 内核空间占用CPU的百分比；
0.0% ni 代表 改变过优先级的进程占用CPU的百分比；
98.1% id 代表 空闲CPU百分比；
0.3% wa 代表 IO等待占用CPU的百分比；
0.0% hi 代表 硬中断（Hardware IRQ）占用CPU的百分比；
0.2% si 代表 软中断（Software Interrupts）占用CPU的百分比；
0.0% st 代表 虚拟机相关的占用CPU的百分比；

+ 第四行：内存状态，具体如下：

3399732k total — 物理内存总量（3.4GB）
3032408k used — 使用中的内存总量（3GB）
367324k free — 空闲内存总量（0.4GB）
1378964k buffers — 缓存的内存量 （1.4GB）

+ 第五行：swap交换分区信息，具体如下：

2104508k total — 交换区总量（2.1GB）
355412k used   — 使用的交换区总量（0.4GB）
1749096k free   — 空闲交换区总量（1.7GB）
504036k cached — 缓冲的交换区总量（0.5GB）

所以有上述数据得到的可用内存为“第四行的free + 第四行的buffers + 第五行的cached”，约为2.3GB

+ 第七行：各进程（任务）的状态监控，列信息说明如下：

PID — 进程id
USER — 进程所有者
PR — 进程优先级
NI — nice值。负值表示高优先级，正值表示低优先级
VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
SHR — 共享内存大小，单位kb
S — 进程状态：D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
%CPU — 上次更新到现在的CPU时间占用百分比
%MEM — 进程使用的物理内存百分比
TIME+ — 进程使用的CPU时间总计，单位1/100秒
COMMAND — 进程名称（命令名/命令行）

## 使用技巧

### 多核CPU监控

在top基本视图中，按键盘数字“1”，可监控每个逻辑CPU的状况。
图显示有4个逻辑CPU，实际上是1个物理CPU。

![top指令显示多核信息](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-top-multiprocessors.png)

```
//查看物理CPU的个数
#cat /proc/cpuinfo |grep "physical id"|sort |uniq|wc -l

//查看逻辑CPU的个数
#cat /proc/cpuinfo |grep "processor"|wc -l

//查看CPU是几核
#cat /proc/cpuinfo |grep "cores"|uniq
```

### 高亮显示当前运行进程

按键盘“b”（打开/关闭）,当前高亮行为状态为运行态的那个进程。

![top指令高亮显示](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-top-highlight.png)

### 进程字段排序

先按键盘“x”，打开排序列的高亮效果，
按CPU占用率排序：shift + p；
按内存占用率排序：shift + m；
按CPU占用时间排序：shift + t；
按PID排序：shift + n；

![top指令排序](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-top-sort.png)

### 通过`shift + >`或`shift + <`可以向右或左改变排序列

下图是由上图按一次`shift + >`的效果图,视图现在已经按照TIME+来排序。

![top指令排序](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-top-move-column.png)

## top交互命令

在top 命令执行过程中可以使用的一些交互命令。
这些命令都是单字母的，如果在命令行中使用了s 选项， 其中一些命令可能会被屏蔽。

h 显示帮助画面，给出一些简短的命令总结说明
k 终止一个进程。
i 忽略闲置和僵死进程。这是一个开关式命令。
q 退出程序
r 重新安排一个进程的优先级别
S 切换到累计模式
s 改变两次刷新之间的延迟时间（单位为s），如果有小数，就换算成m s。输入0值则系统将不断刷新，默认值是5 s
f或者F 从当前显示中添加或者删除项目
o或者O 改变显示项目的顺序
l 切换显示平均负载和启动时间信息
m 切换显示内存信息
t 切换显示进程和CPU状态信息
c 切换显示命令名称和完整命令行
M 根据驻留内存大小进行排序
P 根据CPU使用百分比大小进行排序
T 根据时间/累计时间进行排序
W 将当前设置写入~/.toprc文件中 



