import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {TestCreateRef, TestForwordRef} from './react-api-learn/ref-learn/create-ref'
import ContextLearn from './react-api-learn/context-learn'
import SuspenseLearn from './react-api-learn/suspense-learn'

function App() {
    return <>
        <TestCreateRef/>
        <TestForwordRef/>
        <hr/>
        <ContextLearn/>
        <hr/>
        <SuspenseLearn/>
    </>
}
ReactDOM.render(<App/>, document.getElementById('root'))
