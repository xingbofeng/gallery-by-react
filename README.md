# gallery-by-react

A gallery based on React.js http://www.xingbofeng.com/gallery-by-react/
es6版本
该项目为前端基于React构建，通过Yeoman帮助我们创建项目，提供更好的工具来使我们的项目更多样化。最终通过Webpack打包生成的图片画廊应用。

## Demo & Examples

在线Demo : http://www.xingbofeng.com/gallery-by-react/

## 安装

```
git clone https://github.com/xingbofeng/gallery-by-react.git
cd gallery-by-react
npm install
npm start
```

通过`http://localhost:8000`进入本项目

## 相关目录说明
- src/: 本项目开发代码所在目录
  - index.html: 经Yeoman构建的入口文件
  - index.js：引入相关依赖
  - styles/：存放本项目样式表文件
  	- App.scss 本项目相关样式表文件
  - images/: 存放本项目图片
  - data/:
  	- imageDatas.json: 存放本项目图片src、alt等相关信息
  - components/：
  	- Main.js: 项目核心组件所在目录
- dist/ :经webpack打包后的项目文件
  - index.html：打包后的项目入口文件
- cfg/: 存放webpack开发环境和生产环境的配置文件。
  - base.js
  - defaults.js：webpack开发环境配置文件
  - dev.js：
  - dist.js：webpack生产环境配置文件
  - test.js: webpack测试代码配置文件
- test/: 测试代码所在目录
- .editorconfig：用于统一不同的编辑器/IDE的编码风格。
- .eslintrc：代码风格检测工具，用于约束es/js/jsx的写法。
- .yo-rc.json：Yeoman的配置文件。
- package.json：node项目的配置文件。
- karma.conf.js: karma测试框架的配置文件。
- node_modules/: 存放基于node的相关依赖包


## 浏览器支持

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Chrome 4.0+ ✔ | Firefox 10.0+ ✔ | Opera 15.0+ ✔ | Safari 4.0+ ✔ |