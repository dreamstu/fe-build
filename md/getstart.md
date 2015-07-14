#尝试动手编写CMD模块
**在动手之前，建议先阅读 [CMD模块定义规范](/preview/rule)**


在这，你已经熟悉了JS中的CMD规范了。现在自己动手写一个JS模块应该不难了吧？
如果你还是不熟练呢，请跟着我的步伐，一步一步编写一个你的第一个符合CMD规范的JS模块

## 准备工作

1. 你需要一个编辑器，你可以使用你自己最喜欢的编辑器来完成这个简单的工作。我推荐使用[sublime-text](http://www.sublimetext.com/)。

- 建立一个项目根目录，用来存放所有的模块文件。比如：`test`，你可以使用命令行的方式，我推荐这样做，因为我觉得这样更高效。
当然你首先需要一个支持linux常用命令的终端。
```
mkdir test
```

## 编写一个基础模块
请确保你已经在项目根目录`test`中。

1. 在你的电脑磁盘中新建一个文件夹，比如叫做：`hello`。 
```
mkdir hello
```
- 进入`hello`文件夹，并新建一个JS文件。比如这个文件为：`index.js`
```
cd hello
touch index.js
```

- 用你准备好的编辑器打开这个JS文件，并且写入：
```
define('hello/index', function(require, exports, module) {
	var _ = {};
	_.sayHello = function(){
		alert('hello');
	};
	module.exports = _;
});
```

- 保存文件。

OK，至此，你已经完成了你的第一个CMD模块的编写，它的模块标识为`hello/index`，你在模块中向外提供了一个`_`对象，这个对象有一个`sayHello`函数可以弹出一个对你说`hello`的网页对话框。

现在你可以通过其他的模块依赖`hello/index.js`这个模块（[CMD模块定义规范](/preview/rule)说过，一个JS文件即是一个模块），并使用其提供的接口。

## 编写一个业务模块
这个业务模块依赖`hello/index`基础模块，通过基础模块提供的接口，完善其自己的具体业务。

1. 同样，在与`hello`同级目录新建一个`robot`目录
```
mkdir robot
```
- 进入到`robot`文件夹，并新建一个`index.js`，代表一个`机器人`业务模块
```
cd robot 
touch index.js
```
- 用你准备好的编辑器打开这个JS文件，并且写入：
```
define('robot/index', function(require, exports, module) {
	var say = require('hello/index');
	
	//some code ....

	say.sayHello();

	//你可以像hello/index模块那样做，向外提供一些接口。
	//module.exports = ...;
});
```
- 保存文件。

太棒了，你已经完成了两个JS小模块的编写。接下来去运行一下，看看结果吧！

* [使用SeaJs运行你写的模块](/preview/run)


