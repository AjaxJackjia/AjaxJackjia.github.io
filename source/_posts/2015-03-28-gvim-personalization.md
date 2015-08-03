title: "gvim个性化配置"
date: 2015-03-28 21:51:28
category: 
- 开发工具
tags:
- vim
- 个性化
- 配置
---

知道vim是很久之前的事情了，但是一直没有上手练习那些命令，最近才开始捡起来vim的命令，感觉非常高效。但是gvim一开始的界面非常丑，还是需要自己配置下才看着舒服，用着也顺手。下面是我自己常用的vim界面配置。

<pre><code class="language-bash">
if has("gui_running")
  set guifont=YaHei_Consolas_Hybrid:h12
  colo desert
  set nu
  set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
  set fileencoding=utf-8
endif
</code></pre>

<a class="cotent-img" href="/uploads/2015/3/gvim配色方案.png">
	<img src="/uploads/2015/3/gvim配色方案.png" alt="gvim配色方案">
</a>

gui字体配置是使用set guifont命令，具体格式为set guifont=字体:字号。

主题设置是colo命令，gvim下面的配色方案有
* blue
* darkblue
* default
* delek
* desert
* elflord
* evening
* koehler
* morning
* murphy
* pablo
* peachpuff
* ron
* shine
* slate
* torte
* zellner

set nu设置显示行号。

set fileencodings是设置文件读入时的编码侯选集；set fileencoding是设置写入文件时的编码方案。

另外，如果觉得vim保存文件之后有默认备份不太好，则可以在vim目录下的vimrc_example.vim中设置，将第27行改为set nobackup。

<pre data-line="27" data-line-offset="23"><code class="language-bash">
if has("vms")
  set nobackup		// do not keep a backup file, use versions instead
else
  set nobackup		// keep a backup file 
endif
</code></pre>

下面有必要说一下vim的编码方式。这里主要借鉴了[【vim的编码方式】](http://edyfox.codecarver.org/html/vim_fileencodings_detection.html)这篇文章。

## vim编码方式
-----------------------
在 Vim 中，有四个与编码有关的选项，它们是：fileencodings、fileencoding、encoding 和 termencoding。

### 1. encoding

encoding 是 Vim 内部使用的字符编码方式。当设置了 encoding 之后，Vim 内部所有的 buffer、寄存器、脚本中的字符串等，全都使用这个编码。Vim 在工作的时候，如果编码方式与它的内部编码不一致，它会先把编码转换成内部编码。如果工作用的编码中含有无法转换为内部编码的字符，在这些字符就会丢失。因此，在选择 Vim 的内部编码的时候，一定要使用一种表现能力足够强的编码，以免影响正常工作。

由于 encoding 选项涉及到 Vim 中所有字符的内部表示，因此只能在 Vim 启动的时候设置一次。在 Vim 工作过程中修改 encoding 会造成非常多的问题。如果没有特别的理由，请始终将 encoding 设置为 utf-8。为了避免在非 UTF-8 的系统如 Windows 下，菜单和系统提示出现乱码，可同时做这几项设置：

<pre><code class="language-bash">
set encoding=utf-8
set langmenu=zh_CN.UTF-8
language message zh_CN.UTF-8
</code></pre>

### 2. termencoding

termencoding 是 Vim 用于屏幕显示的编码，在显示的时候，Vim 会把内部编码转换为屏幕编码，再用于输出。内部编码中含有无法转换为屏幕编码的字符时，该字符会变成问号，但不会影响对它的编辑操作。如果 termencoding 没有设置，则直接使用 encoding 不进行转换。

举个例子，当你在 Windows 下通过 telnet 登录 Linux 工作站时，由于 Windows 的 telnet 是 GBK 编码的，而 Linux 下使用 UTF-8 编码，你在 telnet 下的 Vim 中就会乱码。此时有两种消除乱码的方式：一是把 Vim 的 encoding 改为 gbk，另一种方法是保持 encoding 为 utf-8，把 termencoding 改为 gbk，让 Vim 在显示的时候转码。显然，使用前一种方法时，如果遇到编辑的文件中含有 GBK 无法表示的字符时，这些字符就会丢失。但如果使用后一种方法，虽然由于终端所限，这些字符无法显示，但在编辑过程中这些字符是不会丢失的。

对于图形界面下的 GVim，它的显示不依赖 TERM，因此 termencoding 对于它没有意义。在 GTK2 下的 GVim 中，termencoding 永远是 utf-8，并且不能修改。而 Windows 下的 GVim 则忽略 termencoding 的存在。

### 3. fileencoding

当 Vim 从磁盘上读取文件的时候，会对文件的编码进行探测。如果文件的编码方式和 Vim 的内部编码方式不同，Vim 就会对编码进行转换。转换完毕后，Vim 会将 fileencoding 选项设置为文件的编码。当 Vim 存盘的时候，如果 encoding 和 fileencoding 不一样，Vim 就会进行编码转换。因此，通过打开文件后设置 fileencoding，我们可以将文件由一种编码转换为另一种编码。但是，由前面的介绍可以看出，fileencoding 是在打开文件的时候，由 Vim 进行探测后自动设置的。因此，如果出现乱码，我们无法通过在打开文件后重新设置 fileencoding 来纠正乱码。

### 4. fileencodings

编码的自动识别是通过设置 fileencodings 实现的，注意是复数形式。fileencodings 是一个用逗号分隔的列表，列表中的每一项是一种编码的名称。当我们打开文件的时候，VIM 按顺序使用 fileencodings 中的编码进行尝试解码，如果成功的话，就使用该编码方式进行解码，并将 fileencoding 设置为这个值，如果失败的话，就继续试验下一个编码。

因此，我们在设置 fileencodings 的时候，一定要把要求严格的、当文件不是这个编码的时候更容易出现解码失败的编码方式放在前面，把宽松的编码方式放在后面。

例如，latin1 是一种非常宽松的编码方式，任何一种编码方式得到的文本，用 latin1 进行解码，都不会发生解码失败——当然，解码得到的结果自然也就是理所当然的“乱码”。因此，如果你把 latin1 放到了 fileencodings 的第一位的话，打开任何中文文件都是乱码也就是理所当然的了。

以下是滇狐推荐的一个 fileencodings 设置：

<pre><code class="language-bash">
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
</code></pre>

其中，ucs-bom 是一种非常严格的编码，非该编码的文件几乎没有可能被误判为 ucs-bom，因此放在第一位。

utf-8 也相当严格，除了很短的文件外(例如许多人津津乐道的 GBK 编码的“联通”被误判为 UTF-8 编码的经典错误)，现实生活中一般文件是几乎不可能被误判的，因此放在第二位。

如果编码被误判了，解码后的结果就无法被人类识别，于是我们就说，这个文件乱码了。此时，如果你知道这个文件的正确编码的话，可以在打开文件的时候使用 ++enc=encoding 的方式来打开文件，如：

<pre><code class="language-bash">
:e ++enc=utf-8 myfile.txt
</code></pre>

### 5. fencview
根据前面的介绍，我们知道，通过 Vim 内置的编码识别机制，识别率是很低的，尤其是对于简体中文 (GBK/GB18030)、繁体中文 (Big5)、日文 (euc-jp) 和韩文 (euc-kr) 之间的识别。而对于普通用户而言，肉眼看出一个文件的编码方式也是很不现实的事情。因此，滇狐强烈推荐水木社区的 mbbill 开发的 fencview 插件。该插件使用词频统计的方式识别编码，正确率非常高。点击[这里](http://www.vim.org/scripts/script.php?script_id=1708)下载。


## Reference:
[http://edyfox.codecarver.org/html/vim_fileencodings_detection.html](http://edyfox.codecarver.org/html/vim_fileencodings_detection.html)

--EOF--

