function render(vnode, container) {
    mount(vnode, container)
}

const VTYPE_TO_MOUNT_FUN_MAP = {
    0: mountTextNode,
    1: mountHtmlNode,
    2: mountClassNode,
    3: mountFuncNode
}
//把虚拟节点变成真实DOM
function mount(vnode, container) {
    let {vtype} = vnode
    vtype = vtype || 0//因为TextNode是没有vtype这个字段的
    const mountFn = VTYPE_TO_MOUNT_FUN_MAP[vtype]
    if (typeof mountFn === 'function') {
        mountFn(vnode, container)
    }
}

//处理class组件
function mountClassNode(vnode, container) {
    const {type, props} = vnode
    const component = new type(props)
    const node = component.render()
    mount(node, container)
}
//处理function组件
function mountFuncNode(vnode, container) {
    const {type, props} = vnode
    const node = type(props)
    mount(node, container)
}
//处理原生的标签
function mountHtmlNode(vnode, container) {
    const {type, props} = vnode
    const node = document.createElement(type)
    const {children, ...rest} = props
    children.map(item => {
        //处理数组Api
        if (Array.isArray(item)) {
            item.map(c => {
                mount(c, node)
            })
        } else {
            mount(item, node)
        }
    })
    //处理元素的attribute
    Object.keys(rest).map(item => {
        if (item === 'className') {
            node.setAttribute('class', rest[item])
        }
        if (item.slice(0, 2) === 'on') {
            node.addEventListener('click', rest[item])
        }
    })
    container.appendChild(node)
}
//处理文本节点
function mountTextNode(vnode, container) {
    const node = document.createTextNode(vnode)
    container.appendChild(node)
}

export default {
    render
}