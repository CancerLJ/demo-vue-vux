const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const koaBody = require('koa-body')()
const cors = require('koa2-cors')

app.use(cors({
	origin: function (ctx) {
		// if (ctx.url === '/test') {
		// 	return "*"; // 允许来自所有域名请求
		// }
		// return 'http://localhost';
		return '*'
		// 这样就能只允许 http://localhost:8080 这个域名的请求了
	},
	exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	maxAge: 5,
	credentials: true,
	allowMethods: ['GET', 'POST', 'DELETE'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get('/api/test', ctx => {
  const query = ctx.query   // ctx.request.query 或者 ctx.query
  ctx.response.body = {
    "code": 0,
    "msg": "",
    "data": {
    }
  }
})

router.get('/api/test/:id', ctx => {
  const params = ctx.params   // ctx.params
  ctx.response.body = {
    "code": 0,
    "msg": "",
    "data": {
    }
  }
})

router.post('/api/post', koaBody, ctx => {
  const body = ctx.request.body   // ctx.request.body
  ctx.response.body = {
    "code": 0,
    "errmsg": ""
  }
})

// 获取分类列表
router.get('/api/category/lists', ctx => {
  ctx.response.body = {
    "code": 0,
    "msg": "获取文章分类成功",
    "data": [
      { id: 1, name: '前端开发' },
      { id: 2, name: '后端开发' },
      { id: 3, name: '运维管理' },
      { id: 4, name: '其他' }
    ]
  }
})

const articles = [
  {
    id: 1, title: '网站中的中文字体处理', desc: '网站中的中文字体处理', thumbnail: null, update_time: 1554984103, content: `<h2><a id="_0"></a>备注</h2><p>设计人员设计的效果图，有时候会出现一些特殊字体。WebFont技术提供了在网页使用特殊字体的可能，从而避免用图片的方法。它的实现方法是通过CSS的@font-face引入字体。很多互联网公司已经率先采用了这种方法，比如Apple官网就是采用了自己的字体。Google也推出了免费的WebFont云托管服务，在国外网站自定义字体得到很好的应用。<br />　　英文字体文字部分由26个字母组成，所以字体文件通常不会太大;而中文汉字数量总共约有九万左右， 国标(GB)字库 有6763字, 而根据《现代汉语常用字表》统计数据，常用汉字也要有3500个左右。 中文字体文件通常都会几M的大小，参照现在中国的网络环境，显然不适合在项目中使用。<br />　　针对中文字体，就可以将用到的所有文字汇总出来，用特殊工具将字体文件压缩，只保留使用的文字。</p><h2><a id="_6"></a>字蛛</h2><h3><a id="_7"></a>安装</h3><p>1、先安装node.js。到Nodejs中文网(http://nodejs.cn/)下载并安装。<br />2、在命令行（cmd）中输入命令：<code>npm install font-spider -g</code> 安装字蛛。</p><h3><a id="_11"></a>使用</h3><p>1、在某个目录中新建目录结构（eg：<code>d:/fonts/minicartoon/demo.html</code>），将相应的css文件，ttf字体文件和html文件放到相应的位置。</p><blockquote><p><strong>备注：</strong></p><ol><li>@font-face 中的 src 定义的 .ttf 文件必须存在，其余的格式将由工具自动生成</li><li>开发阶段请使用相对路径的 CSS 与 WebFont</li></ol></blockquote><p>2、编写css文件如下：</p><pre><div class="hljs"><code class="lang-css">@<span class="hljs-keyword">charset</span> ‘utf-<span class="hljs-number">8</span>‘;<span class="hljs-comment">/*声明 WebFont*/</span>@<span class="hljs-keyword">font-face</span> {  <span class="hljs-attribute">font-family</span>: ‘minicartoon‘;  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(‘../font/minicartoon.eot‘);  <span class="hljs-attribute">src</span>:    <span class="hljs-built_in">url</span>(‘../font/minicartoon.eot?#font-spider‘) <span class="hljs-built_in">format</span>(‘embedded-opentype‘),    <span class="hljs-built_in">url</span>(‘../font/minicartoon.woff‘) <span class="hljs-built_in">format</span>(‘woff‘),    <span class="hljs-built_in">url</span>(‘../font/minicartoon.ttf‘) <span class="hljs-built_in">format</span>(‘truetype‘),    <span class="hljs-built_in">url</span>(‘../font/minicartoon.svg‘) <span class="hljs-built_in">format</span>(‘svg‘);  <span class="hljs-attribute">font-weight</span>: normal;  <span class="hljs-attribute">font-style</span>: normal;}<span class="hljs-comment">/*使用选择器指定字体*/</span><span class="hljs-selector-class">.home</span> <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-class">.demo</span> &gt; <span class="hljs-selector-class">.test</span> {    <span class="hljs-attribute">font-family</span>: ‘minicartoon‘;}</code></div></pre><p>3、编写html文件，将用到的所有的文字汇总到文件中，引入css文件。</p><pre><div class="hljs"><code class="lang-html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>	<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>	<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>minicartoon demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>	<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/font.css"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>	<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"home"</span>&gt;</span>		<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>迷你简卡通<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>	<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>	<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo"</span>&gt;</span>		<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>			尊敬的m*********，			我们初识于2014年6月18日，我们结缘已365天了！我们还会继续相伴“钱”行！			您还没参与过红筹活动，			您难道不想成为一名安静的美土豪吗？			马上赚钱			您还没参与过白拿活动,			为什么白给的，您都不要呢？			立即省钱			与您相遇，是最美的记忆；			伴您“钱”行，是我们最终的目的！			让我们在新的一年里，扬帆，远航！			炫耀一下			独具慧眼			我会赚钱			我会省钱			更多精彩						您于2014年6月18日，			第一次参与赚钱！			到现在您已赚了8888888888元！			您于2014年6月18日，			第一次参与白拿！			到现在您已白拿了3333元的商品！			abcdefghijklmnopqrstuvwxyz			ABCDEFGHIJKLMNOPQRSTUVWXYZ			1234567890			./*-+/.,;''"":|_!~\`@#$%^&amp;*()<span class="hljs-tag">&lt;&gt;</span>			《》？：“；：”|{}[]~\`!@#$%^&amp;*()_+		<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>	<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></div></pre><p>4、<code>win + R</code>，输入<code>cmd</code>打开命令行。切换到相应的目录，运行命令：<code>font-spider ./demo/*.html</code>。 如下：</p><pre><code class="lang-">d:cd fonts/minicartoonfont-spider ./demo.html</code></pre><h2><a id="_97"></a>参考链接</h2><blockquote><ul><li><a href="http://top.css88.com/archives/494" target="_blank">字蛛（FontSpider）—中文字体压缩器 让网页自由引入中文字体成为可能</a></li><li><a href="http://www.uml.org.cn/itnews/2015030504.asp" target="_blank">设计师的春天：中文WebFont解决方案Font-Spider(字蛛)</a></li><li><a href="http://font-spider.org/" target="_blank">字蛛官网</a></li><li><a href="http://www.youziku.com" target="_blank">有字库</a></li></ul></blockquote>`
  }, {
    id: 2, title: '自动化构建工具gulp入门', desc: '自动化构建工具gulp入门', thumbnail: '/uploads/20190412/135fe0a38a73404f73c3b75353a84355.png', update_time: 1555471382, content: `<h2><a id="gulp_0"></a>gulp简介</h2><p>gulp是一款基于node.js前端自动化构建工具，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。增强前端开发工作流程。</p><h2><a id="gulp_2"></a>gulp安装</h2><ol><li>安装node.js。此处不再累述。</li><li>使用node.js的包管理工具npm安装gulp。（-g ： 全局安装）</li></ol><pre><code class="lang-">npm install -g gulp</code></pre><ol start="3"><li>安装完成后使用 <code>gulp -v</code>命令，确认gulp安装成功。</li></ol><h2><a id="gulp_10"></a>gulp使用</h2><p>1、 创建package.json，安装模块依赖（项目位置：d:\mtest\gulp\demo）</p><pre><code class="lang-">d:cd mtest\gulp\demonpm initnpm install gulp --save-devnpm install gulp-uglify gulp-watch-path stream-combiner2 gulp-sourcemaps gulp-clean-css gulp-autoprefixer gulp-less gulp-ruby-sass gulp-imagemin gulp-util del gulp-rename --save-dev</code></pre><p>代码解析：</p><blockquote><ul><li><code>npm init</code>：可以生成package.json文件</li><li>gulp重新在项目下安装的原因：防止全局gulp升级后与此项目gulpfile.js代码不兼容</li><li><code>--save-dev</code>：将依赖的模块更新到package.json文件中<br />-<code>gulp-util</code>：gulp最基础的工具，基本上每个项目都会用到</li><li><code>gulp-uglify</code>：压缩JavaScript</li><li><code>gulp-watch-path</code>：检测修改的文件</li><li><code>stream-combiner2</code>：文件中有js错误时，显示信息，继续执行</li><li><code>gulp-sourcemaps</code>：生成maps，便于调试</li><li><code>gulp-clean-css</code>：压缩 CSS。原来是<code>gulp-minify-css</code></li><li><code>gulp-autoprefixer</code>：给 CSS 增加前缀。解决某些CSS属性不是标准属性，有各种浏览器前缀的情况</li><li><code>gulp-less</code>：less编译</li><li><code>gulp-ruby-sass</code>：sass编译</li><li><code>gulp-imagemin</code>：除了能压缩常见的图片格式，还能压缩 SVG</li><li><code>gulp-rename</code>：修改文件名称。比如有时我们需要把app.js改成app.min.js</li><li><code>del</code>：删除</li><li><code>gulp-htmlmin</code>：压缩 HTML</li><li><code>gulp-concat</code>：合并文件</li></ul></blockquote><p>2、 生成package.json等配置后，其他人安装依赖的模块，只需要运行命令：<code>npm install</code>即可。</p><p>3、 新建<code>gulpfile.js</code>作为入口文件</p><p>4、 设计目录：例如</p><pre><code class="lang-">src		css		js		images		fonts		less		sassdist</code></pre><p>5、 编写<code>gulpfile.js</code>文件代码</p><p>6、 使用<code>gulp</code>命令执行。备注：不带参数时，默然执行的是default</p><h2><a id="gulpfilejs_58"></a>gulpfile.js代码</h2><p>1、 配置错误信息输出</p><pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp'</span>),	gutil = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-util'</span>);<span class="hljs-keyword">var</span> handleError = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{	<span class="hljs-keyword">var</span> colors = gutil.colors;	<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'\n'</span>);	gutil.log(colors.red(<span class="hljs-string">'Error!'</span>));	gutil.log(<span class="hljs-string">'fileName: '</span> + colors.red(err.fileName));	gutil.log(<span class="hljs-string">'lineNumber: '</span> + colors.red(err.lineNumber));	gutil.log(<span class="hljs-string">'message: '</span> + err.message);	gutil.log(<span class="hljs-string">'plugin: '</span> + colors.yellow(err.plugin));}</code></div></pre><p>2、 js代码压缩</p><pre><div class="hljs"><code class="lang-javascript"><span class="hljs-keyword">var</span> uglify = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-uglify'</span>);<span class="hljs-comment">//代码压缩</span>gulp.task(<span class="hljs-string">'uglifyjs'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	<span class="hljs-keyword">var</span> combined = combiner.obj([		gulp.src(<span class="hljs-string">'src/js/**/*.js'</span>),		sourcemaps.init(),		rename({<span class="hljs-attr">suffix</span> : <span class="hljs-string">'.min'</span>}),		uglify(),		sourcemaps.write(<span class="hljs-string">'./map/'</span>),		gulp.dest(<span class="hljs-string">'dist/js'</span>)	])	combined.on(<span class="hljs-string">'error'</span>, handleError)	<span class="hljs-comment">//gulp.src('src/js/**/*.js')</span>	<span class="hljs-comment">//	.pipe(uglify())</span>	<span class="hljs-comment">//	.pipe(gulp.dest('dist/js'))</span>});<span class="hljs-comment">//代码修改检测</span>gulp.task(<span class="hljs-string">'watchjs'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	gulp.watch(<span class="hljs-string">'src/js/**/*.js'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{		<span class="hljs-keyword">var</span> paths = watchPath(event, <span class="hljs-string">'src/'</span>, <span class="hljs-string">'dist/'</span>);		gutil.log(gutil.colors.green(event.type) + <span class="hljs-string">' '</span> + paths.srcPath);		gutil.log(<span class="hljs-string">'Dist '</span> + paths.distPath);		<span class="hljs-keyword">var</span> combined = combiner.obj([			gulp.src(paths.srcPath),			sourcemaps.init(),			rename({<span class="hljs-attr">suffix</span> : <span class="hljs-string">'.min'</span>}),			uglify(),			sourcemaps.write(<span class="hljs-string">'./map/'</span>),			gulp.dest(paths.distDir)		])		combined.on(<span class="hljs-string">'error'</span>, handleError)	})})</code></div></pre><p>3、 css代码压缩</p><pre><div class="hljs"><code class="lang-javascript">gulp.task(<span class="hljs-string">'lesscss'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	<span class="hljs-keyword">var</span> combined = combiner.obj([		gulp.src(<span class="hljs-string">'src/less/**/*.less'</span>),		sourcemaps.init(),		less(),		rename({<span class="hljs-attr">suffix</span> : <span class="hljs-string">'.min'</span>}),		minifycss(),		sourcemaps.write(<span class="hljs-string">'./map/'</span>),		gulp.dest(<span class="hljs-string">'dist/css'</span>)	])	combined.on(<span class="hljs-string">'error'</span>, handleError);});</code></div></pre><p>4、 images图片压缩</p><pre><div class="hljs"><code class="lang-javascript">gulp.task(<span class="hljs-string">'image'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	gulp.src(<span class="hljs-string">'src/images/**/*'</span>)		.pipe(imagemin({			<span class="hljs-attr">progressive</span> : <span class="hljs-literal">true</span>		}))		.pipe(gulp.dest(<span class="hljs-string">'dist/images'</span>))})</code></div></pre><p>5、 fonts文件迁移</p><pre><div class="hljs"><code class="lang-javascript">gulp.task(<span class="hljs-string">'fonts'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	gulp.src(<span class="hljs-string">'src/fonts/**/*'</span>)		.pipe(gulp.dest(<span class="hljs-string">'dist/fonts/'</span>))})</code></div></pre><p>6、 less文件编译</p><pre><div class="hljs"><code class="lang-javascript">gulp.task(<span class="hljs-string">'lesscss'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	<span class="hljs-keyword">var</span> combined = combiner.obj([		gulp.src(<span class="hljs-string">'src/less/**/*.less'</span>),		sourcemaps.init(),		less(),		rename({<span class="hljs-attr">suffix</span> : <span class="hljs-string">'.min'</span>}),		minifycss(),		sourcemaps.write(<span class="hljs-string">'./map/'</span>),		gulp.dest(<span class="hljs-string">'dist/css'</span>)	])	combined.on(<span class="hljs-string">'error'</span>, handleError);});</code></div></pre><p>7、 sass文件编译</p><pre><div class="hljs"><code class="lang-javascript">gulp.task(<span class="hljs-string">'sasscss'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{	sass(<span class="hljs-string">'src/sass/'</span>)		.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{			<span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Error!'</span>, err.message);		})		.pipe(sourcemaps.init())		.pipe(rename({<span class="hljs-attr">suffix</span> : <span class="hljs-string">'.min'</span>}))		.pipe(minifycss())		.pipe(sourcemaps.write(<span class="hljs-string">'./'</span>))		.pipe(gulp.dest(<span class="hljs-string">'dist/css'</span>))});</code></div></pre><p>Demo下载：<a href="/download/gulp.zip" target="_blank">猛戳这里</a></p><h2><a id="_183"></a>相关网站</h2><blockquote><ul><li><a href="http://www.gulpjs.com.cn/" target="_blank">gulp中文网</a></li><li><a href="http://www.cnblogs.com/Darren_code/p/gulp.html" target="_blank">gulp使用小结一</a></li><li><a href="https://segmentfault.com/a/1190000000372547" target="_blank">前端构建工具gulp入门教程</a></li></ul></blockquote>`
  }, {
    id: 3, title: '控制input只能输入数值', desc: '表单验证：控制input只能输入数值，禁止粘贴，禁止中文等', thumbnail: null, update_time: 1553680396, content: `<h2><a id="_0"></a>要求</h2><p>页面中input输入框。输入时候判断输入的规则是否正确。规则如下</p><blockquote><ul><li>输入的数值在1~10000之间；最多两位小数</li><li>最好禁止中文输入法</li><li>禁止粘贴</li></ul></blockquote><h2><a id="_6"></a>分析</h2><p>事件可以使用keypress、keydown、keyup等，也可以检测input输入框变化事件。不能使用change事件（此事件貌似仅在焦点离开这个输入框的时候才触发）<br />判断输入的字符。符合相应规则，继续执行；不符合规则，阻止默认行为<br />禁止粘贴使用<code>onpaste=&quot;return false;&quot;</code>阻止默认行为<br />禁止中文使用css3属性<code>ime-mode:disabled</code>(此方法在新Chrome浏览器中已经不支持)</p><h2><a id="_12"></a>实现一</h2><pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mywant_money"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入金额"</span> <span class="hljs-attr">onpaste</span>=<span class="hljs-string">"return false;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">$(<span class="hljs-string">"input#mywant_money"</span>).keypress(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{    <span class="hljs-keyword">var</span> getValue = $(<span class="hljs-keyword">this</span>).val();    <span class="hljs-comment">//控制第一个不能输入小数点"."或者"0"</span>    <span class="hljs-keyword">if</span>(getValue.length == <span class="hljs-number">0</span> &amp;&amp; (event.which == <span class="hljs-number">46</span> || event.which == <span class="hljs-number">48</span>)){        event.preventDefault();        <span class="hljs-keyword">return</span>;    }    <span class="hljs-comment">//控制只能输入一个小数点"."</span>    <span class="hljs-keyword">if</span> (getValue.indexOf(<span class="hljs-string">'.'</span>) != <span class="hljs-number">-1</span> &amp;&amp; event.which == <span class="hljs-number">46</span>) {        event.preventDefault();        <span class="hljs-keyword">return</span>;    }    <span class="hljs-comment">//控制只能输入的值</span>    <span class="hljs-keyword">if</span> (event.which &amp;&amp; (event.which &lt; <span class="hljs-number">48</span> || event.which &gt; <span class="hljs-number">57</span>) &amp;&amp; event.which != <span class="hljs-number">8</span> &amp;&amp; event.which != <span class="hljs-number">46</span>) {        event.preventDefault();        <span class="hljs-keyword">return</span>;    }    <span class="hljs-keyword">if</span>(event.which != <span class="hljs-number">46</span> &amp;&amp; event.which &gt;= <span class="hljs-number">48</span> &amp;&amp; event.which &lt;= <span class="hljs-number">57</span> &amp;&amp; ((<span class="hljs-built_in">parseFloat</span>(getValue) * <span class="hljs-number">10</span> + event.which - <span class="hljs-number">48</span>) &gt; <span class="hljs-number">10000</span>) &amp;&amp; getValue.indexOf(<span class="hljs-string">'.'</span>) == <span class="hljs-number">-1</span>){        <span class="hljs-comment">//getValue = getValue.substring(0, getValue.length - 1);</span>        layer.msg(<span class="hljs-string">"补贴花费不能超过1万元哦！"</span> , {<span class="hljs-attr">icon</span>: <span class="hljs-number">2</span> , <span class="hljs-attr">shade</span>: <span class="hljs-number">0.3</span>  , <span class="hljs-attr">closeBtn</span>: <span class="hljs-number">1</span> });        event.preventDefault();        <span class="hljs-keyword">return</span>;    }    <span class="hljs-keyword">if</span> (getValue.indexOf(<span class="hljs-string">'.'</span>) != <span class="hljs-number">-1</span> &amp;&amp; getValue.toString().split(<span class="hljs-string">"."</span>)[<span class="hljs-number">1</span>].length &gt;= <span class="hljs-number">2</span>){        event.preventDefault();        <span class="hljs-keyword">return</span>;    }}).css(<span class="hljs-string">"ime-mode"</span>, <span class="hljs-string">"disabled"</span>);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></div></pre><p>说明：<br />Chrome中不能禁止中文输入，这种方式可以在输入框中输入中文</p><h2><a id="_50"></a>实现二</h2><pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mywant_money"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入金额"</span> <span class="hljs-attr">onpaste</span>=<span class="hljs-string">"return false;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">$(<span class="hljs-string">"input#mywant_money"</span>).keyup(<span class="hljs-function"><span class=…n class="hljs-regexp">/[^\d.]/g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//清除"数字"和"."以外的字符</span>    obj = obj.replace(<span class="hljs-regexp">/^\./g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//验证第一个字符是数字</span>    obj = obj.replace(<span class="hljs-regexp">/^0/g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//验证第一个字符是不是0</span>    obj = obj.replace(<span class="hljs-regexp">/\.{2,}/g</span>,<span class="hljs-string">"."</span>); <span class="hljs-comment">//只保留第一个, 清除多余的</span>    obj = obj.replace(<span class="hljs-string">"."</span>,<span class="hljs-string">"$#$"</span>).replace(<span class="hljs-regexp">/\./g</span>,<span class="hljs-string">""</span>).replace(<span class="hljs-string">"$#$"</span>,<span class="hljs-string">"."</span>);    obj = obj.replace(<span class="hljs-regexp">/^(\-)*(\d+)\.(\d\d).*$/</span>,<span class="hljs-string">'$1$2.$3'</span>); <span class="hljs-comment">//只能输入两个小数</span>    <span class="hljs-keyword">if</span>(obj &gt; <span class="hljs-number">10000</span>){        obj = obj.substring(<span class="hljs-number">0</span>, obj.length - <span class="hljs-number">1</span>);        layer.msg(<span class="hljs-string">"补贴花费不能超过1万元哦！"</span> , {<span class="hljs-attr">icon</span>: <span class="hljs-number">2</span> , <span class="hljs-attr">shade</span>: <span class="hljs-number">0.3</span>  , <span class="hljs-attr">closeBtn</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">"温馨提示"</span> });    }    <span class="hljs-keyword">return</span> obj;}</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></div></pre><p>说明：<br />在输入之后再进行判断，不合适的删除<br />切换到中文输入法，输入字母+space键可以处理；但输入字母+Enter键没有触发keyup事件，尚未找到原因</p><h2><a id="_76"></a>实现三</h2><pre><div class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mywant_money"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入金额"</span> <span class="hljs-attr">onpaste</span>=<span class="hljs-string">"return false;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">$(<span class="hljs-string">"input#mywant_money"</span>).bind(<span class="hljs-string">"input propertychange"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{    $(<span class="hljs-keyword">this</span>).val(numValidate($(<span class="hljs-keyword">this</span>).val()));});<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numValidate</span>(<span class="hljs-params">obj</span>)</span>{    obj = obj.replace(<span class="hljs-regexp">/[^\d.]/g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//清除"数字"和"."以外的字符</span>    obj = obj.replace(<span class="hljs-regexp">/^\./g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//验证第一个字符是数字</span>    obj = obj.replace(<span class="hljs-regexp">/^0/g</span>,<span class="hljs-string">""</span>); <span class="hljs-comment">//验证第一个字符是不是0</span>    obj = obj.replace(<span class="hljs-regexp">/\.{2,}/g</span>,<span class="hljs-string">"."</span>); <span class="hljs-comment">//只保留第一个, 清除多余的</span>    obj = obj.replace(<span class="hljs-string">"."</span>,<span class="hljs-string">"$#$"</span>).replace(<span class="hljs-regexp">/\./g</span>,<span class="hljs-string">""</span>).replace(<span class="hljs-string">"$#$"</span>,<span class="hljs-string">"."</span>);    obj = obj.replace(<span class="hljs-regexp">/^(\-)*(\d+)\.(\d\d).*$/</span>,<span class="hljs-string">'$1$2.$3'</span>); <span class="hljs-comment">//只能输入两个小数</span>    <span class="hljs-keyword">if</span>(obj &gt; <span class="hljs-number">10000</span>){        obj = obj.substring(<span class="hljs-number">0</span>, obj.length - <span class="hljs-number">1</span>);        layer.msg(<span class="hljs-string">"补贴花费不能超过1万元哦！"</span> , {<span class="hljs-attr">icon</span>: <span class="hljs-number">2</span> , <span class="hljs-attr">shade</span>: <span class="hljs-number">0.3</span>  , <span class="hljs-attr">closeBtn</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">"温馨提示"</span> });    }    <span class="hljs-keyword">return</span> obj;}</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></div></pre><p>说明：<br />与方法二基本相同，只是用propertychange事件和input事件响应（为了兼容不同的浏览器，这两个事件都需要响应）。<br />函数里面的<code>if(obj &gt; 10000){}</code> 推荐使用 <code>while(obj &gt; 10000){}</code></p>`
  }
]

// 获取文章列表
router.get('/api/article/lists', ctx => {
  ctx.response.body = {
    "code": 0,
    "msg": "获取文章列表成功",
    "data": {
      list: articles,
      total: 5
    }
  }
})

// 获取文章详情
router.get('/api/article/detail', ctx => {
  const query = ctx.query
  const id = parseInt(query.id)
  if (isNaN(id) || id < 1 || id > 3) {
    ctx.response.body = {
      "code": 1,
      "msg": "缺少必要的参数",
      "data": {}
    }
  }

  let index = 0
  for(let i = 0; i < articles.length; i++) {
    if (articles[i].id == id) {
      index = i
      break
    }
  }

  ctx.response.body = {
    "code": 0,
    "msg": "获取文章成功",
    "data": articles[index]
  }
})

// 获取tags
router.get('/api/search/tags', ctx => {
  ctx.response.body = {
    "code": 0,
    "msg": "获取标签成功",
    "data": [
      { id: 1, name: 'NodeJs', count: 2 },
      { id: 2, name: 'Vue', count: 9 },
      { id: 3, name: 'Javascript', count: 10 },
      { id: 4, name: 'Linux', count: 1 },
      { id: 5, name: 'Nginx', count: 5 }
    ]
  }
})

// 搜索
router.get('/api/search/lists', ctx => {
  const data = []
  articles.forEach((item, index) => {
    if (index%2 ==0) {
      data.push(item)
    }
  })

  ctx.response.body = {
    "code": 0,
    "msg": "搜索成功",
    "data": data
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3001)
