# 构建React项目

```shell
1.安装node
2.全局安装yarn，npm i yarn -g
3.全局安装create-react-app，npm i create-react-app -g
4.查看版本 create-react-app --version
node -v
npm -v
5.创建react项目，create-react-app xxx【项目只允许小写】
```

## Yarn

[yarn官方中文文档](https://yarn.bootcss.com/docs/getting-started)

```js
0.安装最新版LTS版本node，全局安装yarn：npm i -g yarn
1.打开Terminal，进入项目当前目录，执行yarn命令。
2.开发模式运行项目，yarn start
3.需要安装其他的工具包，yarn add [package]@[version] [-D]
4.全局安装工具包，yarn global add <package>
5.yarn cache dir 打印出当前的 yarn 全局缓存在哪里
6.yarn remote <package> 删除工具包
```

# React 源码解析

## ReactDOM.render

1. 创建ReactRoot
2. 创建FiberRoot和RootFiber，
3. 创建更新

FiberRoot是整个应用的起点，包含应用挂载的目标节点，记录整个应用更新过程的各种信息。

Fiber：每个ReactElement对应一个Fiber对象，记录节点的各种状态（比如我们的class Component的this.state和this.props他是记录在Fiber对象上面的，然后再fiber更新之后，才回更新到我们的class Component上。而不是通过class component他自己去调理这个过程。这也给了react实现hooks的一个方便。）。fiber还能够串联整个应用形成的树结构。 

