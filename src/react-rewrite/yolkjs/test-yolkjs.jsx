import React from './index.jsx'

class ClassComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 18
        }
    }

    handlerClick = () => {
        this.setState({
            age: this.state.age + 1,
        })
    }

    render() {
        return <div>
            <h1>大神老师今年{this.state.age}岁了</h1>
            <button onClick={this.handlerClick}>累加</button>
        </div>
    }
}

const ClassComponentTransfer = React.transfer(ClassComponent)
const ReactDOM = React
const {useState} = React
function App(props) {
    const [count, setCount] = useState(1)
    return <div>
        <h1>hello，{props.title}，{count}</h1>
        <button onClick={() => setCount(count + 1)}>累加</button>
        <hr/>
        <ClassComponentTransfer/>
    </div>
}
let element = <App title="elite cheng"/>
ReactDOM.render(element, document.getElementById('root'))
