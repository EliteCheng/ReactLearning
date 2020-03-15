/**
 * 1. webpack+babel编译时，替换JSX为
 * React.createElement(type,props,...children)
 * 2. 所有React.createElement()执⾏行行结束后得到⼀一个JS对象即vdom，
 * 它能够完整描述dom结构
 * 3. ReactDOM.render(vdom, container)可以将vdom转换为dom并追加
 * 到container中
 * 4. 实际上，转换过程需要经过⼀一个diff过程，⽐对出实际更更新补丁操作
 * dom
 */

const VNODE_TYPE = {
    0: 'TextNode',
    1: 'HtmlNode',
    2: 'ClassNode',
    3: 'FuncNode'
}

function createElement(type, props, ...children) {
    props.children = children

    let vtype = 0
    if (typeof type === 'string') {
        vtype = 1
    }
    if (typeof type === 'function') {
        vtype = type.isReactComponent ? 2 : 3
    }
    return {
        vtype,
        type,
        props,
    }
}

export class Component {
    static isReactComponent = {}

    constructor(props) {
        this.props = props
        this.state = {}
    }

    setState = () => {

    }
}

export default {
    createElement,
}