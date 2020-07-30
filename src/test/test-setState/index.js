import React, {PureComponent} from 'react'

export default class TestSetState extends PureComponent {
    state = {cnt: 0}

    render() {
        return <h1 style={{
            cursor: 'pointer',
        }}>{this.state.cnt}</h1>
    }

    componentDidMount() {
        this.setState({cnt: this.state.cnt + 1})
        console.debug('cnt', this.state.cnt)//打印0
        //setTimeout和setInterval都是同步更新
        window.setTimeout(() => {
            console.debug('cnt in setTimeout preVal', this.state.cnt)//打印1,
            this.setState({cnt: this.state.cnt + 1})
            console.debug('cnt in setTimeout', this.state.cnt)//打印2，而不是上次的值1
        }, 0)
        //浏览器原生事件
        document.body.addEventListener('click', () => {
            console.debug('cnt in body event preVal', this.state.cnt)//打印2
            this.setState({cnt: this.state.cnt + 1})
            console.debug('cnt in body event', this.state.cnt)//打印3,而不是上次的值2
        })
    }
}
