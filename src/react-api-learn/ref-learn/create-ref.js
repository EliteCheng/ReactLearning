import React, {Component} from 'react'

class TestCreateRef extends Component {
    constructor(props) {
        super(props)
        this.objRef = React.createRef()

    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.stringRef.textContent = 'String ref Got'
            this.methodRef.textContent = 'method ref Got'
            this.objRef.current.textContent = 'obj ref Got'
        }, 1000)
    }

    render() {
        return <>
            <p ref='stringRef'>span1</p>
            <p ref={ele => {
                this.methodRef = ele
            }}>span2</p>
            <p ref={this.objRef}>span3</p>
        </>
    }
}

// const TargetComponent = props => <input type='text'/>
//forwordRef Api主要是给函数式组件提供ref，避免使用HOC
const TargetComponent = React.forwardRef((props, ref) => {
    return <input type='text' ref={ref}/>
})

class TestForwordRef extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        setTimeout(() => {
            this.ref.current.value = 'ref get input'
        }, 1000)
    }

    render() {
        return <TargetComponent ref={this.ref}/>
    }
}

export {
    TestCreateRef,
    TestForwordRef
}
