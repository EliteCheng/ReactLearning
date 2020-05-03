import React, {PureComponent} from 'react'

export default class TestSetState extends PureComponent {
    state = {cnt: 0}

    render() {
        return <div>{this.state.cnt}</div>
    }

    componentDidMount() {
        this.setState({cnt: this.state.cnt + 1})
        console.debug('cnt', this.state.cnt)//打印0
        setTimeout(() => {
            console.debug('cnt in setTimeout preVal', this.state.cnt)//打印1,
            this.setState({cnt: this.state.cnt + 1})
            console.debug('cnt in setTimeout', this.state.cnt)//打印2，而不是上次的值1
        }, 0)
        document.body.addEventListener('click', () => {
            console.debug('cnt in body event preVal', this.state.cnt)//打印2,3,4,...
            this.setState({cnt: this.state.cnt + 1})
            console.debug('cnt in body event', this.state.cnt)//打印3,4,5,...
        })
    }
}
