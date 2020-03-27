function createElement(type, props, ...children) {
    delete props.__source
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                if (typeof child === 'object') {
                    return child
                }
                return createTextElement(child)

            })
        }
    }
}

/**
 * 创建文本类型的虚拟DOM
 */
function createTextElement(text) {
    return {
        type: 'TEXT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

/**
 *通过虚拟dom 新建dom元素
 * @param vdom {虚拟dom}
 */
function createDom(vdom) {
    const {type, props} = vdom
    let dom = null
    if (type === 'TEXT') {
        dom = document.createTextNode('')
    }
    else dom = document.createElement(vdom.type)
    Object.keys(props).filter(key => key !== 'children')
    .forEach(name => {
        //@todo 事件处理 属性兼容
        dom[name] = props[name]
    })
    return dom
}

/**
 * @param vdom {{虚拟dom}}
 * @param container {{容器}}
 */
function render(vdom, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [vdom]
        }
    }

    // let dom = createDom(vdom)
    // vdom.props.children.forEach(child => {
    //     render(vdom, dom)
    // })
    // container.appendChild(dom)
    // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`
}

//render会初始化第一个任务
//下一个单元任务
let nextUnitOfWork = null
//保存全局的fiber的根节点
let wipRoot = null
//调度我们的diff或者渲染任务
function workLoop(deadline) {
    // 有下一个任务，并且当前帧还没有结束
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    // 如果当前帧结束了，但是还有任务没有完成，需要再次注册我们的任务
    window.requestIdleCallback(workLoop)
}
//启动空闲时间处理
window.requestIdleCallback(workLoop)

/**
 * 执行下一个单元任务
 * @param fiber 调用链（纤维）
 * fiber的数据结构
 fiber = {
    dom: '真实DOM',
    parent: '父元素',
    child: '第一个子元素',
    slibing: '下一个兄弟',
}
 <div id="root">
 <div>
 <h1>
 <p>这是一个段落</p>
 <a href="#">这是一个超链接</a>
 </h1>
 <h2>H2</h2>
 </div>
 </div>
 root
 ||
 <div>
 ||
 <h1><==><h2>
 ||
 <p><==><a>
 *
 */
function performUnitOfWork(fiber) {
    //获取下一个任务
    //根据当前的任务，获取下一个
    if (!fiber.dom) {
        //如果不是入口，也就是fiber.dom == null即没有container
        fiber.dom = createDom(fiber)
    }
    //真实的DOM操作先注释掉
    //如果有parent，说明父元素是存在的
    // if (fiber.parent) {
    //     //把当前节点append过去
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }
    //获取当前fiber的所有子元素
    const elements = fiber.props.children
    //构建成fiber结构
    let index = 0
    let prevSlibing = null
    while (index < elements.length) {
        let element = elements[index]
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        }
        if (index === 0) {
            //第一个元素，是父元素的child属性，其实就是从上到下
            fiber.child = newFiber
        } else {
            //其他的是以兄弟元素存在，其实就是从左到右
            prevSlibing.slibing = newFiber
        }
        prevSlibing = fiber
        index++
        //fiber基本结构构建完毕
    }


    //找下一个任务
    //先找子元素
    if (fiber.child) {
        return fiber.child
    }
    //如果没有子元素了，就找兄弟元素
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.slibing) {
            return nextFiber.slibing
        }
        //没有兄弟元素，找父元素
        nextFiber = nextFiber.parent
    }
}

export default {
    createElement,
    render
}



