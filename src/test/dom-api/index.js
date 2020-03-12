import React, {useState} from 'react'

export default function App() {
    const [count, setCount] = useState(0)

    const click = (e) => {
        document.forms['info']['boy'].checked = !document.forms['info']['boy'].checked
        e.preventDefault()
    }
    return <form style={{marginTop: '50vh', marginLeft: '40vw'}} name='info'>
        <input name='boy' type='radio'/>男
        <input name='girl' type='radio'/>女
        <input name='sss' type='radio'/>保密
        <br/>
        <button onClick={click}>点我</button>
    </form>
}


