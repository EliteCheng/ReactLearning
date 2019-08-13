import React from 'react'
import Child from './Child'

export default class PropsNotChange extends React.Component {

    state = {
        obj: {
            v1: 10,
            v2: 10,
            v3: 10,
            v4: 10,
        }
    }

    handleModifyObj = propName => {
        return evt => {
            evt.stopPropagation()
            let {obj} = this.state
            obj[propName] = obj[propName] + 1
            this.setState({obj: {...obj}})
        }
    }

    render() {
        const {obj} = this.state
        return <div>
            <Child value={obj.v1} onChange={this.handleModifyObj("v1")}/>
            <Child value={obj.v2} onChange={this.handleModifyObj("v2")}/>
            <Child value={obj.v3} onChange={this.handleModifyObj("v3")}/>
            <button onClick={this.handleModifyObj('v4')}>父组件Click++
            </button>
            <div>v4:{this.state.v4}</div>
        </div>
    }
}