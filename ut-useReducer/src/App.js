//The first data is the starting code for the tutorial and the bottom data is furnished code of the tutorial
// import './App.css';
// import { useState } from 'react';

// function App() {
//   const [userInput, setUserInput] = useState('')
//   const [count, setCount] = useState(0)
//   const [color, setColor] = useState(false)
//   return (
//     <main className="App" style={{ color: color ? '#FFF' : '#FFF952' }}>
//       <input
//         type="text"
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//       />
//       <br /><br />
//       <p>{count}</p>
//       <section>
//         <button onClick={(() => setCount(prev=>prev-1))}>-</button>
//         <button onClick={(() => setCount(prev=>prev+1))}>+</button>
//         <button onClick={(() => setColor(!color))}>Color</button>
//       </section>
//       <br /><br />
//       <p>{userInput}</p>
//     </main>
//   );
// }

// export default App;

//__________________________________________After tutorial work__________________________________

import './App.css';
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'newUserInput':
      return { ...state, userInput: action.payload}
    case 'tgColor':
      return{ ...state, color: !state.color}
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    userInput: '',
    color: false
  })

  return (
    <main className="App" style={{ color: state.color ? '#FFF' : '#FFF952' }}>
      <input
        type="text"
        value={state.userInput}
        onChange={(e) => dispatch({type: 'newUserInput', payload: e.target.value})}
      />
      <br /><br />
      <p>{state.count}</p>
      <section>
        <button onClick={(() => dispatch({type: 'decrement'}))}>-</button>
        <button onClick={(() => dispatch({type: 'increment'}))}>+</button>
        <button onClick={(() => dispatch({type: 'tgColor'}))}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  );
}

export default App;