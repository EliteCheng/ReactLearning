function createElement(type, props, ...children) {
    delete props.__source
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === 'object'
                    ? child
                    : createTextElement(child)
            )
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
 * @param vdom 虚拟dom
 */
function createDom(vdom) {
    let dom = vdom.type === 'TEXT'
        ? document.createTextNode('')
        : document.createElement(vdom.type)
    updateDom(dom, {}, vdom.props)
    return dom
}
function updateDom(dom, prevProps, nextProps) {
    //1.规避children属性
    //2.老的存在，取消
    //3.新的存在，新增 并没有做新老相等的判定
    //@TODO:事件的兼容性问题这里不做处理
    Object.keys(prevProps)
    .filter(name => name !== 'children')
    .filter(name => !(name in nextProps))
    .forEach(name => {
        if (name.slice(0, 2) === 'on') {
            dom.removeEventListener(name.slice(0, 2).toLowerCase(),
                prevProps[name], false)
        }
        dom[name] = ''
    })
    Object.keys(nextProps)
    .filter(name => name !== 'children')
    .forEach(name => {
        if (name.slice(0, 2) === 'on') {
            dom.addEventListener(name.slice(2).toLowerCase(),
                nextProps[name], false)
        }
        dom[name] = nextProps[name]
    })
}

function commitRoot() {
    deletions.forEach(commitWork)
    //提交任务
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    //清除任务，防止重复工作
    wipRoot = null
}
function commitWork(fiber) {
    if (!fiber) return
    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom
    if (fiber.effectTag === 'PLACEMENT'
        && fiber.dom != null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE'
        && fiber.dom != null) {
        updateDom(fiber.dom, fiber.base.props, fiber.props)
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

/**
 * @param vdom 虚拟dom
 * @param container 容器
 */
function render(vdom, container) {
    //设置全局的nextUnitOfWork
    wipRoot = {
        dom: container,
        props: {
            children: [vdom]
        },
        base: currentRoot //存储上一个fiber的根节点
    }
    deletions = []
    //表示我们的第一个任务
    nextUnitOfWork = wipRoot
}

//render会初始化第一个任务
//下一个单元任务
let nextUnitOfWork = null
//保存全局的fiber的根节点
let wipRoot = null
//保存当前工作的一个root
let currentRoot = null
//保存需要删除的fiber节点
let deletions = null

//调度我们的diff或者渲染任务
function workLoop(deadline) {
    // 有下一个任务，并且当前帧还没有结束
    while (nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }
    if (!nextUnitOfWork && wipRoot) {
        //没有任务了并且根节点还在,提交我们需要工作的任务
        commitRoot()
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
    sibling: '下一个兄弟',
}*/
const _ = `<div id="root">
    <div>
        <h1>
            <p>这是一个段落</p>
            <a href="#">这是一个超链接</a>
        </h1>
        <h2>H2</h2>
    </div>
</div>`
/**
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
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }
    //找下一个任务
    //先找子元素
    if (fiber.child) {
        return fiber.child
    }
    //如果没有子元素了，就找兄弟元素
    let nextFiber = fiber
    while (nextFiber != null) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        //没有兄弟元素，找父元素
        nextFiber = nextFiber.parent
    }
}
let wipFiber = null
let hookIndex = null
function useState(init) {
    let tmpVar = wipFiber.base
    let oldHook = tmpVar && (tmpVar = tmpVar.hooks) && tmpVar[hookIndex]
    const hook = {
        state: oldHook ? oldHook.state : init,
        queue: [],
    }
    const actions = oldHook ? oldHook.queue : []
    actions.forEach(action => {
        hook.state = action
    })
    const setState = action => {
        hook.queue.push(action)
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            base: currentRoot
        }
        nextUnitOfWork = wipRoot
        deletions = []
    }
    wipFiber.hooks.push(hook)
    hookIndex++
    return [hook.state, setState]
}
function updateFunctionComponent(fiber) {
    wipFiber = fiber
    hookIndex = 0
    wipFiber.hooks = []
    //执行函数组件，传入props
    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)
}
function updateHostComponent(fiber) {
    //下一个任务
    //根据当前的任务，获取下一个
    if (!fiber.dom) {
        //如果不是入口，也就是fiber.dom == null即没有container
        fiber.dom = createDom(fiber)
    }

    //获取当前fiber的所有子元素
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
}
/**
 * 构建成fiber结构
 */
function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.base && wipFiber.base.child
    let prevSibling = null
    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null
        //对比oldFiber的状态和当前element
        //先比较类型
        const sameType = oldFiber && element
            && oldFiber.type === element.type
        if (sameType) {
            //复用节点，更新
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                base: oldFiber,
                effectTag: 'UPDATE'
            }
        }
        if (element && !sameType) {
            //替换节点
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                base: null,
                effectTag: 'PLACEMENT'
            }
        }
        if (oldFiber && !sameType) {
            //删除节点
            oldFiber.effectTag = 'DELETION'
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
        if (index === 0) {
            //第一个元素，是父元素的child属性，其实就是从上到下
            wipFiber.child = newFiber
        } else if (element) {
            //其他的是以兄弟元素存在，其实就是从左到右
            prevSibling.sibling = newFiber
        }
        prevSibling = newFiber
        index++
    }
}

class Component {
    constructor(props) {
        this.props = props
    }
}

/**
 * 把类组件，转换成函数组件，利用hooks实现setState。
 * @param Component
 * @returns {function(*=): *}
 */
function transfer(Component) {
    return function (props) {
        const component = new Component(props)
        // 简单的规避eslitn
        let initState = useState
        let [state, setState] = useState(component.state)
        component.props = props
        component.state = state
        component.setState = setState
        return component.render()
    }
}

export default {
    createElement,
    render,
    useState,
    Component,
    transfer
}
