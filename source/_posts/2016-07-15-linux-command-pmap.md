title: linux指令之pmap 
toc: true
date: 2016-07-15 00:42:17
category:
- Linux
tags:
- linux command
---

# pmap

## 命令作用

提供了进程的内存映射信息，可以显示一个或者多个进程的内存状态信息和地址空间。

<!--more-->

## 命令参数

`pmap [-options] PID`

-x  extended 显示扩展格式
-d  device 显示设备格式
-q  quiet 不显示header/footer行
-V  显示版本信息

## 扩展格式和设备格式域

**Address**:  start address of map  映像起始地址
**Kbytes**:  size of map in kilobytes  映像大小
**RSS**:  resident set size in kilobytes  驻留集大小
**Dirty**:  dirty pages (both shared and private) in kilobytes  脏页大小
**Mode**:  permissions on map 映像权限: r=read, w=write, x=execute, s=shared, p=private (copy on write)  
**Mapping**:  file backing the map , or '[ anon ]' for allocated memory, or '[ stack ]' for the program stack.  映像支持文件, [anon]为已分配内存 [stack]为程序堆栈
**Offset**:  offset into the file  文件偏移
**Device**:  device name (major:minor)  设备名

## 示例

`pmap -d 16910`
![pmap指令显示-d](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-pmap-d.png)
mapped 表示该进程映射的虚拟地址空间大小，也就是该进程预先分配的虚拟内存大小，即ps出的vsz；
writeable/private 表示进程所占用的私有地址空间大小，也就是该进程实际使用的内存大小；
shared 表示进程和其他进程共享的内存大小；

`pmap -x 16910`
![pmap指令显示-x](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-pmap-x.png)


