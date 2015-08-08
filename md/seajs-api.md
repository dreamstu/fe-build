
# Seajs API
提供简单、极致的模块化开发体验


非官方文档，整理来自[官方](http://seajs.org/)文档的文字与实例，方便速查。

## seajs.config `Object`

### alias `Object`
别名配置，配置之后可在模块中使用require调用
`require('jquery');`

```
seajs.config({
    alias: { 'jquery': 'jquery/1.7.2/jquery' } 
});
```
```
define(function(require, exports, module) {
    //引用jQuery模块
    var $ = require('jquery');
});
```

### paths `Object`

设置路径，方便跨目录调用。通过灵活的设置path可以在不影响`base`的情况下指定到某个目录。
```
seajs.config({
    //设置路径
    paths: {
        'gallery': 'https://a.alipayobjects.com/gallery'
    },

    // 设置别名，方便调用
    alias: {
        'underscore': 'gallery/underscore'
    }
});
```
```
define(function(require, exports, module) {
    var _ = require('underscore');
     //=> 加载的是 https://a.alipayobjects.com/gallery/underscore.js
});
```

### vars `Object`
变量配置。有些场景下，模块路径在运行时才能确定，这时可以使用 `vars` 变量来配置。

`vars` 配置的是模块标识中的变量值，在模块标识中用 `{key}` 来表示变量。

```
seajs.config({
    // 变量配置
    vars: {
        'locale': 'zh-cn'
    }
});
```
```
define(function(require, exports, module) {
  var lang = require('./i18n/{locale}.js');
     //=> 加载的是 path/to/i18n/zh-cn.js
});
```

### map `Array`

该配置可对模块路径进行映射修改，可用于路径转换、在线调试等。
```
seajs.config({
    map: [
        [ '.js', '-debug.js' ]
    ]
});
```
```
define(function(require, exports, module) {
    var a = require('./a');
    //=> 加载的是 path/to/a-debug.js
});
```

### preload `Array`

使用`preload`配置项，可以在普通模块加载前，提前加载并初始化好指定模块。
`preload`中的空字符串会被忽略掉。

```
// 在老浏览器中，提前加载好 ES5 和 json 模块
seajs.config({
    preload: [
        Function.prototype.bind ? '' : 'es5-safe',
        this.JSON ? '' : 'json'
    ]
});
```
> 注意：`preload`中的配置，需要等到 use 时才加载。比如：

```
seajs.config({
    preload: 'a'
});

// 在加载 b 之前，会确保模块 a 已经加载并执行好
seajs.use('./b');
```
> preload 配置不能放在模块文件里面：

```
seajs.config({
    preload: 'a'
});

define(function(require, exports) {
    //此处执行时，不能保证模块 a 已经加载并执行好
});

```

### debug `Boolean`

值为`true`时，加载器不会删除动态插入的 script 标签。插件也可以根据`debug`配置，来决策 log 等信息的输出。

### base `String`

Sea.js 在解析顶级标识时，会相对 base 路径来解析。

> 注意：一般请不要配置 base 路径，把 sea.js 放在合适的路径往往更简单一致。

### charse `String | Function`

获取模块文件时，<script> 或 <link> 标签的`charset`属性。 默认是`utf-8`

`charset`还可以是一个函数：
```
seajs.config({
    charset: function(url) {
        // xxx 目录下的文件用 gbk 编码加载
        if (url.indexOf('http://example.com/js/xxx') === 0) {
          return 'gbk';
        }

        // 其他文件用 utf-8 编码
        return 'utf-8';
    }
});
```

## seajs.use `Function`

用来在页面中加载一个或多个模块。`seajs.use(id, callback?)`
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
** 注意：seajs.use 与 DOM ready 事件没有任何关系。如果某些操作要确保在 DOM ready 后执行，需要使用 jquery 等类库来保证。比如**
```
seajs.use(['jquery', './main'], function($, main) {
    $(document).ready(function() {
        main.init();
    });
});
```

## seajs.cache `Ojbect`

通过 seajs.cache，可以查阅当前模块系统中的所有模块信息。

比如，打开 seajs.org，然后在 WebKit Developer Tools 的 Console 面板中输入 seajs.cache，可以看到：
```
Object
  > http://seajs.org/docs/assets/main.js: x
  > https://a.alipayobjects.com/jquery/jquery/1.10.1/jquery.js: x
  > __proto__: Object
```

这些就是文档首页用到的模块。展开某一项可以看到模块的具体信息，含义可参考：[CMD 模块定义规范](/preview/rule) 中的 module 小节。

## seajs.reslove `Function`

类似`require.resolve`，会利用模块系统的内部机制对传入的字符串参数进行路径解析。
```
seajs.resolve('jquery');
// => http://path/to/jquery.js

seajs.resolve('./a', 'http://example.com/to/b.js');
// => http://example.com/to/a.js
```
** seajs.resolve 方法不光可以用来调试路径解析是否正确，还可以用在插件开发环境中。**

## seajs.data `Object`

通过 seajs.data，可以查看 seajs 所有配置以及一些内部变量的值，可用于插件开发。当加载遇到问题时，也可用于调试。

## 常见问题

### 关于模块标识

Seajs模块标识主要以`小驼峰字符串`、`.`或`..`
```
// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('./b');
  // => http://example.com/js/b.js

// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('../c');
  // => http://example.com/c.js
```

分为 **相对** 与 **顶级** 标识。以`.`或`..`开头，则为相对标识 。以`小驼峰字符串`开关，则为顶级标识。
```
// 假设 base 路径是：http://example.com/assets/

// 在模块代码里：
require.resolve('gallery/jquery/1.9.1/jquery');
  // => http://example.com/assets/gallery/jquery/1.9.1/jquery.js
```

### 关于路径

Seajs除了相对与顶级标识之外，还可以使用普通路径来加载模块。

```
//sea.js的路径，即 base 路径，相对于当前页面
<script src='http://domain.com/assets/sea-modules/seajs.js'></script>

<script type='text/javascript'>
//配置Seajs
seajs.config({
    alias: {
        //顶级标识，基于 base 路径
        'module1': 'module1/0.0.1/index.js',
            // => http://domain.com/assets/sea-modules/module1/0.0.1/index.js
        'module2': 'module2/0.0.2/index.js'
    }
});

seajs.config({
    alias: {
        //普通路径，相对于当前页面
        'affix': '../assets/widget/src/widget-affix.js',

        //相对标识，相对于当前页面
        'init': './src/init.js'
    }
});
</script>
```

> **开始的时候会觉得Seajs的路径有点不习惯，由其是Base路径。切记Base路径就是sea.js的那个文件的上级路径，然后所有顶级标识，相对标识都是相对于这个Base来调整。**