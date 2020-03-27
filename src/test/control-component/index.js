import React, {useState} from 'react'

export default function App(props) {
    const [rate, setRate] = useState(0)
    return <>
        <input type='text' value={rate} onChange={e => {
            setRate(e.target.value.replace(/\D/g, ''))
        }}/>
    </>
}
