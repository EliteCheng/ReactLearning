import React from 'react'

export default class Child extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        const {value, onChange} = this.props
        console.debug('子组件Render');
        return <div>
            <div>
                父组件传过来的value：{value}
                <button onClick={this.props.onChange}>子组件click++</button>
            </div>
        </div>
    }
}