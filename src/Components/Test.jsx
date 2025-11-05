import React, { useState } from 'react'

export default function Test() {
    const [count, setCount] = useState(0)
    
    function Increament() {
        return setCount(count+1)
    }
    function Decreament() {
        return setCount(count-1)
    }
    function Reset() {
        return setCount(0)
    }
  return (
    <>
    <h1>
        Count : {count}
    </h1>
    <button onClick={Increament}>Increament</button>
    <button onClick={Decreament}>Decreament</button>
    <button onClick={Reset}>Reset</button>
    </>
  )

  
}
