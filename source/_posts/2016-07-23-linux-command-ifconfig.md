title: linux指令之ifconfig
toc: true
date: 2016-07-23 15:07:43
category:
- Linux
tags:
- linux command
---

# ifconfig

## 命令作用

用于配置和显示Linux内核中网络接口的网络参数。
用ifconfig命令配置的网卡信息，在网卡重启后机器重启后，配置会消失。
要想将上述的配置信息永远的存的电脑里，需要修改网卡的配置文件。

<!--more-->

## 命令格式

`# ifconfig [options]`

## 命令参数

add<地址> === 设置网络设备IPv6的IP地址。
del<地址> === 删除网络设备IPv6的IP地址。
down === 关闭指定的网络设备。
hw<网络设备类型><硬件地址> === 设置网络设备的类型与硬件地址。
io_addr< I&#47;O地址 > === 设置网络设备的I&#47;O地址。
irq<IRQ地址> === 设置网络设备的IRQ。
media<网络媒介类型> === 设置网络设备的媒介类型。
mem_start<内存地址> === 设置网络设备在主内存所占用的起始地址。
metric<数目> === 指定在计算数据包的转送次数时，所要加上的数目。
mtu<字节> === 设置网络设备的MTU。
netmask<子网掩码> === 设置网络设备的子网掩码。
tunnel<地址> === 建立IPv4与IPv6之间的隧道通信地址。
up === 启动指定的网络设备。
broadcast<地址> === 将要送往指定地址的数据包当成广播数据包来处理。
-pointopoint<地址> === 与指定地址的网络设备建立直接连线，此模式具有保密功能。
-promisc === 关闭或启动指定网络设备的promiscuous模式。
[IP地址] === 指定网络设备的IP地址。
[网络设备] === 指定网络设备的名称。

## 实例

### 例1

`# ifconfig`

![ifconfig显示](http://7xk4nm.com1.z0.glb.clouddn.com/uploads/2016/7/linux-ifconfig.png)

### 例2

启动关闭指定网卡
`# ifconfig eth0 down`
`# ifconfig eth0 up`

### 例3

为网卡配置和删除IPv6地址
`# ifconfig eth0 add 33ffe:3240:800:1005::2/ 64 //为网卡添加IPv6地址`
`# ifconfig eth0 del 33ffe:3240:800:1005::2/ 64 //为网卡删除IPv6地址`

### 例4

用ifconfig修改MAC地址
`# ifconfig eth0 down //关闭网卡`
`# ifconfig eth0 hw ether 00:AA:BB:CC:DD:EE //修改MAC地址`
`# ifconfig eth0 up //启动网卡`
`# ifconfig eth1 hw ether 00:1D:1C:1D:1E //关闭网卡并修改MAC地址 `
`# ifconfig eth1 up //启动网卡`

### 例5

配置IP地址
`# ifconfig eth0 192.168.1.56 //给eth0网卡配置IP地址`
`# ifconfig eth0 192.168.1.56 netmask 255.255.255.0 // 给eth0网卡配置IP地址,并加上子掩码`
`# ifconfig eth0 192.168.1.56 netmask 255.255.255.0 broadcast 192.168.1.255//给eth0网卡配置IP地址,加上子掩码,加上个广播地址`

### 例6

启用和关闭ARP协议
`# ifconfig eth0 arp //开启`
`# ifconfig eth0 -arp //关闭`

### 例7

设置最大传输单元
`# ifconfig eth0 mtu 1500	//设置能通过的最大数据包大小为 1500 bytes`



参考

http://www.runoob.com/linux/linux-comm-ifconfig.html

