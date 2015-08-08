#使用SeaJs加载你的模块
编写好了自己的模块是不是很鸡冻呢，表着急，下面跟着我慢慢来～

## 关于SeaJs
使用seajs前，你有必要了解一下关于SeaJs的一些事情。

baidu百科一下：
```
SeaJS是一个遵循CommonJS规范的JavaScript模块加载框架，可以实现JavaScript的模块化开发及加载机制。与jQuery等JavaScript框架不同，SeaJS不会扩展封装语言特性，而只是实现JavaScript的模块化及按模块加载。SeaJS的主要目的是令JavaScript开发模块化并可以轻松愉悦进行加载，将前端工程师从繁重的JavaScript文件及对象依赖处理中解放出来，可以专注于代码本身的逻辑。SeaJS可以与jQuery这类框架完美集成。使用SeaJS可以提高JavaScript代码的可读性和清晰度，解决目前JavaScript编程中普遍存在的依赖关系混乱和代码纠缠等问题，方便代码的编写和维护。
```
到这，你应该知道了seajs是用来干什么的？没错，它是用来加载JS模块的，而且仅仅是被用来加载JS模块。

它根据CMD实现了规范，被设计用了加载符合CMD规范的JS模块。支持规范中的标准接口。

## 为什么使用Seajs
关于这个问题，我想，seajs的官网给了我们答案。
```
Sea.js 追求简单、自然的代码书写和组织方式，具有以下核心特性：

简单友好的模块定义规范：Sea.js 遵循 CMD 规范，可以像 Node.js 一般书写模块代码。
自然直观的代码组织方式：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。

Sea.js 还提供常用插件，非常有助于开发调试和性能优化，并具有丰富的可扩展接口。
```

这也正是我们想要的，它的兼容性也很好，几乎兼容所有常用浏览器，更重要的是它遵循`MIT`协议，这意味着你可以随时（无需付出任何代价）根据自己特有的需求去修改其中的源代码，以达到自己业务的要求。

在这里提个建议，如果你想要真正地了解seajs的工作原理，建议你去看看它的源代码，并且仔细阅读seajs的官方网站。

- [seajs官网](http://seajs.org)
- [github](https://github.com/seajs/seajs)

## 获取SeaJs

`sea.js`文件可以在`github`上下载，[https://github.com/seajs/seajs/releases](https://github.com/seajs/seajs/releases)。下载并解压后，找到sea.js文件就是了。

除了手动下载之外，你还可以通过`bower`安装，关于`bower`你可以自行搜索🔍相关资料


##加载你的模块
使用seajs加载你的模块，你只需要在你的HTML网页中导入sea.js文件，并且需要知道两个常用的接口。

- `seajs.config`
- `seajs.use`

下面分别来说明它们各自的用途：

### `seajs.config`
用来对 Sea.js 进行配置。

```
seajs.config({
	//Sea.js 在解析顶级标识时，会相对 base 路径来解析。详情请参阅
  base: './',
  // 设置路径，方便跨目录调用
  paths: {
    'moment': 'https://domain.com/moment',
    'jquery': 'https://domain.com/jquery'
  },

  // 设置别名，方便调用
  alias: {
    'class': 'gallery/class/1.0.0/class',
    'jquery': 'gallery/jquery/1.7.2/jquery'
  }

});
```


### `seajs.use`
用来在页面中加载一个或多个模块。
```
// 加载一个模块
seajs.use('./a');

// 加载一个模块，在加载完成时，执行回调
seajs.use('./a', function(a) {
  a.doSomething();
});

// 加载多个模块，在加载完成时，执行回调
seajs.use(['./a', './b'], function(a, b) {
  a.doSomething();
  b.doSomething();
});
```


更多具体的配置请参阅：[配置](https://github.com/seajs/seajs/issues/262)

更多具体的接口介绍请参阅：[API 快速参考](https://github.com/seajs/seajs/issues/266)

---

我们在上一节编写了两个模块。现在我们利用seajs来加载并执行它们。


### 在页面中加载模块

首先我们在项目的根目录`test`中新建一个HTML网页，`hello.html`，在 `hello.html` 页尾，通过 script 引入 sea.js 后，写上一段配置代码：

```
// seajs 的简单配置
seajs.config({
  base: './',
  alias: {
    'robot': 'robot/index.js'
  }
})

// 加载入口模块
seajs.use('robot');

```

`sea.js` 在下载完成后，会自动加载入口模块。页面中的代码就这么简单。

运行`hello.html`后有没有弹出一个网页对话框呢？再仔细回想下，它是如何做到的！
![](/images/alert.png)

在chrome的控制台中可以看到，页面总共加载了三个js文件，分别是`sea.js`,`robot/index.js`,`hello/index.js`，可以看出，这符合我们代码中的依赖顺序。

![](/images/seajs.gif)



拓展阅读：

- [模块标识](/preview/ideading)
- [SeaJs API速查](/preview/seajs-api)



