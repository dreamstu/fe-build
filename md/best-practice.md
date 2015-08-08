#模块编写的最佳实践

了解了CMD规范原理以及SeaJs模块加载器的实现方式。你知道了原来编写模块是这样的一种体验。
写模块之前，啥都不说，直接先写上：
```
define(function(require, exports, module) {
   // 
})
```
以上其实是被称为`Modules/Wrappings`规范的写法，`define` 可以换成 `module.declare`等等词汇。表示模块书写格式，这些写就好。

但书写格式直接上线会存在问题，比如不能直接压缩、不能合并等，所以我们可以在压缩、合并前，需要先做一些处理，这些处理就是`transport` 操作，`transport` 后的代码格式称之为 `Modules/Transport`规范，这一般是通过构建工具自动生成。典型的：
```
define(id, deps, factory)
```

以上是 `CommonJS` 社区里一部分人的理解。还有一部分觉得，模块在写的时候，就应该带上 `id` 、`deps` 等信息，比如：
```
define("a", ...)

define(["a", "b"], function(a, b) { ... }) // 这就是 AMD 的标准写法

```

在这部分人心中，不应该存在 Transport 规范，Transport 规范也应该是 Wrappings 规范的一种。

还有一批人的想法是，以上格式都是 Transport 格式，都应该由工具生成。真正的模块书写格式应该是：

```
var a = require("a")
exports.foo = ...

```

这部分代表喜欢用自动构建的方式来解决在浏览器上的运行问题，类似 coffee 这种方式。

SeaJS 里，推崇的 Modules/Wrappings 规范是 CMD 规范：

```
define(function(require, exports, module) {
   var a = require("a")
   exports.foo = ...
})
```
以上直接是由开发者手写的，写完后，可直接不经过任何构建工具就在浏览器上加载运行。
但 CMD 模块在正式上线前，依旧需要通过构建工具先转换为 Modules/Transport 格式：
```
define("id", ["dep-1", "dep-2"], function(require, exports, module) {
   // source code
})
```

转换成 Transport 格式后，才能进一步压缩、合并等。


希望说明白了。究竟哪种写法是哪个规范，不同社区有不同看法，CommonJS 社区至今也没统一意见，主要流派就上面三种。