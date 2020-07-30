import React, {Component, createContext, useEffect, useState} from 'react'

const CountContext = createContext(0)

class Foo extends Component {
    render() {
        return <CountContext.Consumer>
            {count => <h1>{count}</h1>}
        </CountContext.Consumer>
    }
}

class Bar extends Component {
    static contextType = CountContext

    render() {
        const count = this.context
        return <h1>{count}</h1>
    }
}

export function App() {
    const [count, setCount] = useState(0)
    return <>
        <button onClick={() => {
            setCount(count + 1)
        }}>
            Click：{count}
        </button>
        <CountContext.Provider value={count}>
            <Foo/>
            <Bar/>
        </CountContext.Provider>
    </>
}
