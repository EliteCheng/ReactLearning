import React, {Component} from './my-react'
import ReactDOM from './my-react/my-react-dom'
import './index.css'

class ClassCmp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
        }
    }

    handle = () => {
        this.setState({counter: this.state.counter + 1})
        this.setState({counter: this.state.counter + 2})
        console.log('counter', this.state)
    }

    render() {
        return <div className='border'>
            name: {this.props.name}
            <p>counter:{this.state.counter}</p>
            <button onClick={this.handle}>点击</button>
            {
                [0, 1, 2].map(item => {
                    return <FuncCmp key={item}
                                    name={`我是function组件${item}`}/>
                })
            }
        </div>
    }
}

function FuncCmp(props) {
    return <div className='border'>name: {props.name}</div>
}
const jsx = <div>
    <p className='border'>我是内容</p>
    <FuncCmp name="我是function组件"/>
    <ClassCmp name="我是class组件"/>
</div>

ReactDOM.render(jsx, document.getElementById('root'))