title: "TCP/IP基础知识(3)"
date: 2015-03-28 13:58:38
category: 
- 网络
tags:
- TCP/IP
- network
- 协议
- 网络
toc: true
---

# TCP/IP体系结构之TCP协议
--------------------------------

## 1. TCP协议连接：建立、管理和终止

TCP是面向连接的协议，在数据传送开始前必须先建立连接，一旦建立了连接，必须对其进行管理。待所有数据都传送完毕后，可以终止连接。

一个连接在其生存期内要经过一系列的状态变迁。在接收到某些事件时，连接可从一个状态前进到另一个状态。这些事件可能来自用户调用（像OPEN、SEND、RECEIVE、CLOSE、ABORT、STATUS），进入的报文段（带有激活的控制位，如SYN、FIN、ACK、RST）以及超时。

由于TCP的多连接特性，每个连接由一对套接字标识。建立、管理和终止连接的过程必须对每个连接独立进行。

在建立连接时要创建一个特殊的数据结构，以保持每个连接的特有数据。这个数据结构被称为运输控制块（TCB）。它包含如套接字对、流入/流出数据缓冲区的指针、滑动窗口系统跟踪发送/接收数据的变量等。

在连接报文中使用控制位。连接请求报文由一个SYN位置1的报文段组成，终止请求报文的FIN位置1，确认报文的ACK位置1。

### TCP连接状态
* **CLOSED**:代表没有任何连接的初始状态。
* **LISTEN**:代表服务器在等待来自任何客户的连接请求。
* **SYN-SENT**:代表客户在发送了一个连接请求后等待服务器的确认和SYN报文。
* **SYN-RECEIVED**:代表服务器在接收到客户请求和发送完确认报文及自己向客户的请求后等待客户的确认。
* **ESTABLISHED**:代表打开了一个连接，在该状态可以进行数据发送。
* **FIN-WAIT1**:代表正在等待对已发送的终止请求的确认。
* **FIN-WAIT2**:代表设备在已经发送了终止请求并且收到了确认报文的情况下，正在等待来自另一设备的终止请求。
* **CLOSING**:代表同时关闭的情况。设备发送了一个终止请求，在接收到确认之前，收到了来自另一设备的终止请求。
* **TIME-WAIT**:代表正在等待超时，以确保远端设备接收到对其终止请求的确认。
* **CLOSE-WAIT**:代表正在等待来自应用的终止请求。
* **LAST-ACK**:代表正在等待对其已发送的终止请求的确认。

### TCP连接生命周期状态图
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp连接生命周期状态图.png">
	<img src="/uploads/2015/3/tcpip_tcp连接生命周期状态图.png" alt="tcpip_tcp连接生命周期状态图" width="680">
</a>

### TCP连接建立
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp连接建立.png">
	<img src="/uploads/2015/3/tcpip_tcp连接建立.png" alt="tcpip_tcp连接建立" width="680">
</a>

连接建立过程有3个目标：
* 启动通信：客户通过发送SYN报文来发起连接请求，该报文由服务器确认。服务器也发送一个SYN报文，该报文由客户确认。
* 序号同步：每个设备都将自己第一次发送要使用的初始序号通知对方。
* TCP选项参数交换：设备之间交换在TCP连接期间要使用的一些TCP选项。 

<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp连接建立2.png">
	<img src="/uploads/2015/3/tcpip_tcp连接建立2.png" alt="tcpip_tcp连接建立2" width="680">
</a>

### TCP连接管理
一旦连接建立，两个设备即可开始互相传送数据。如果连接建立期间出现了问题，TCP连接管理功能必须负责。
连接的两个设备将一直保持在建立状态，直到以下条件之一发生：
* 连接终止：一个设备发送了终止请求报文。
* 连接中断：出现了某些问题，使连接被中断。

#### 半连接处理：
一旦出现问题的设备恢复到正常工作状态，它可以使用一种特殊的复位功能进行复位操作，以便重新建立连接。
连接复位功能由一个首部的控制位字段中RST位置1的报文段构成。

若复位有效，依设备接收复位报文时所处的状态，可以采取下面的动作：
- 接收者处于LISTEN状态，则复位被忽略。
- 接收者处于SYN-RECEIVED状态，并在此之前处于LISTEN状态，则接收者返回到LISTEN状态。
- 接收者处在任何其他状态，它将放弃连接，回到CLOSE状态

### TCP连接终止
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp连接终止.png">
	<img src="/uploads/2015/3/tcpip_tcp连接终止.png" alt="tcpip_tcp连接终止" width="680">
</a>

------------------------------

## 2. TCP可靠性和流控制

TCP是一种提供可靠数据运输的运输协议，但它使用的下层协议是本质上不可靠的网际协议。因此，TCP必须提供将不可靠的运输转化为可靠数据运输的机制。

原则上，提供可靠性所需要的机制应基于对每个发送报文的确认。

### 肯定确认重传（PAR）机制
<a class="cotent-img" href="/uploads/2015/3/tcpip_肯定确认重传机制.png">
	<img src="/uploads/2015/3/tcpip_肯定确认重传机制.png" alt="tcpip_肯定确认重传机制" width="680">
</a>

### 改进的PAR机制
<a class="cotent-img" href="/uploads/2015/3/tcpip_改进的PAR机制.png">
	<img src="/uploads/2015/3/tcpip_改进的PAR机制.png" alt="tcpip_改进的PAR机制" width="680">
</a>

### 流控制功能
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp流控制功能.png">
	<img src="/uploads/2015/3/tcpip_tcp流控制功能.png" alt="tcpip_tcp流控制功能" width="680">
</a>

### TCP滑动窗口确认系统
滑动窗口确认系统是TCP所使用的提供可靠运输和流控制的机制。

它与改进的PAR之间存在如下区别：
* 由于TCP是一个面向流的协议，所以滑动窗口中每个“被标识的报文”都被一个字节序列代替。
* 在滑动窗口中接收设备用最后一个数据字节序号加1来确认每个报文段，表示这必须是发送设备能发送的下一个报文段的序号。

TCP连接两端的每个设备都必须实现滑动窗口，以跟踪已发送的字节和已接收的字节。这样就存在两种滑动窗口：发送和接收窗口
#### 发送窗口
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp发送窗口.png">
	<img src="/uploads/2015/3/tcpip_tcp发送窗口.png" alt="tcpip_tcp发送窗口" width="680">
</a>
#### 接收窗口
<a class="cotent-img" href="/uploads/2015/3/tcpip_tcp接收窗口.png">
	<img src="/uploads/2015/3/tcpip_tcp接收窗口.png" alt="tcpip_tcp接收窗口" width="680">
</a>

#### 滑动窗口指针
发送窗口用3个指针工作，这些指针将字节流分成4个区域。
SND.UNA:发送未确认指针。为已发送但尚未确认的第1个数据字节的序号。
SND.NXT:发送下一个指针。为要发送给另一设备的第1个数据字节的序号。
SND.WND:发送窗口指针。为发送窗口大小。

接收窗口用2个指针工作，这些指针将字节流分成3个区域。
RCV.NXT:接收下一个指针。为希望从另一设备接收的第1个数据字节序号。
RCV.WND:接收窗口指针。为接收窗口大小，这是TCP报文段首部窗口字段的值，用于通知发送者接收设备还能接受多少数据，实现流控制机制。

TCP报文段首部中的序号、确认号和窗口字段用于更新这些指针。

### TCP报文重发机制
重传机制包括下面的过程：
* 对每个发送的报文段，启动一个为它分配的定时器，并将该报文段的副本保存到重发队列中。
* 如果在相应的定时器溢出之前收到了该报文段的确认，则将该报文从重发队列中删除。
* 如果定时器溢出时确认报文段还未到达，则该报文段被自动重发。其定时器重新启动，报文段仍保存在重发队列中，直到接收到一次成功的确认。
* 如果在进行了多次连续的重发后仍然没有收到确认报文段，可认为在网络的某处存在持久性的问题而终止连接，并向应用报告。

### 选择性确认SACK
该功能用于在接收到不连续的报文段时，向发送者报告那些不能被累加性确认系统确认的报文段。这样一来，发送者就有必要的信息来决定再重发一个报文段时对后续的已发报文采取何种策略。

该功能需在建立连接的SYN报文中选择**SACK选项**(类型为4)来使用。而后接收者可用一个报文段的TCP首部选项(类型为5)将所接收的不连续数据块信息通知发送者。

### “糊涂”窗口综合症
被关闭的窗口有可能被这样打开：服务器仍然很忙，但它可以传送一个字节给应用。一旦这样，服务器就会发送一个窗口字段值为1的报文给客户。客户会重新打开其发
送窗口，窗口大小为1字节。

这样就会产生一种效率极低的数据传输方式，此异常情况被称为**“糊涂窗口”综合症(SWS)**。它的出现是因为滑动窗口系统没有为发送的报文段规定最小值。

### TCP常见应用
协议--说明--服务器端口：
FTP--用于传送文件--20/21
TELNET--允许用户使用远程设备--23
SMTP--用于发送电子邮件报文--25
DNS--交换域名解析的请求/应答报文--53
HTTP--用于提取万维网中的文档--80
POP3--用于提取电子邮件报文--110
NNTP--用于传送新闻组报文--119
IMAP--另一种邮件提取协议--143
IRC--允许用户聊天的一种交互协议--194

## 小结
* 运输层为TCP/IP栈中的应用层提供“主机到主机”的通信服务。有两种版本的运输服务：用户数据包协议UDP和运输控制协议TCP。
* 运输层提供进程寻址，允许多个应用共享同一个IP地址。为此，每个进程备份配一个不同的端口号。为服务器应用进程分配知名端口号0~1023之一，客户应用进程启动时都会被分配一个临时端口号。
* 套接字是通信端标识符，它由IP地址和端口号确定。
* UDP是一种简单、高效、快速的运输协议，但它是不可靠的。TCP是一种功能完备的运输协议，它面向连接，提供流控制和确认运输及重传机制。
* 由于TCP是一种面向连接的协议，所以它必须有建立、管理和终止连接的过程。SYN报文用与请求建立连接，在这一阶段，TCB被创建，初始序号和一些TCP选项参数的交换也发生在该阶段。连接建立阶段通过“3次握手”完成。当一个或两个设备决定关闭连接时，执行连接终止阶段。每个设备必须发送FIN报文并接收其确认，此后，连接被认为已经关闭。
* 滑动窗口确认系统为TCP运输提供可靠性和流控制。TCP连接两端的每个设备都必须为其发送和接收实现滑动窗口。一个设备的发送窗口即为另一设备的接收窗口。
* 重传机制跟踪已发送的报文段并在需要时重传这些报文段。对每个已发送的报文段，都要启动一个定时器并将该报文段的副本放入一个重传队列中。若在定时器溢出之前收到了确认，则该报文段被从重传队列中删除，否则，重启定时器并重发该报文段。
* 选择性确认SACK选项允许接收者将已接收的非连续报文段的信息通知发送者，这样一来发送者就能正确决定哪个报文段应被重传。
* 滑动窗口并不只是能限制发送者发送的数据量，它还能降低发送者发送数据的速率。这是通过调整滑动窗口尺寸来实现的。

--EOF--