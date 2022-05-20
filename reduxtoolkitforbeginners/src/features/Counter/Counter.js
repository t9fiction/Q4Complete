import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'

export const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0)
    const addValue = Number(incrementAmount) || 0; //If we dont' receive a Number in the incrementAmount, then it'll take 0.
    
    const resetAll = () =>{
        dispatch(reset());
        setIncrementAmount(0);
    }

    return (
        <section>
            <p>{count}</p>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <input type="text" value={incrementAmount} onChange={(e)=>setIncrementAmount(e.target.value)} />
            <div>
                <button onClick={()=>dispatch(incrementByAmount(addValue))}>Add Amount</button>
                <button onClick={()=>dispatch(resetAll)}>Reset</button>
            </div>

        </section>
    )
}
