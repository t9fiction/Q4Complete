import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'

export const Counter = () => {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch();


  const [amount, setAmount] = useState(0)

  // Check to make sure that we get a number or else set 0
  const addValue = Number(amount) || 0;

  const resetAll = ()=>{
    setAmount(0);
    dispatch(reset())
  }
  
  return (
    <section>
      <p>{count}</p>
      <div>
        <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        </div>
        <br/>
        <input type="text" value={amount} onChange={(e)=>{
          setAmount(e.target.value)
          // e.preventDefault();
        }} />
        <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={() => resetAll()}>Reset All</button>
        </div>
      </div>
    </section>
  )
}
