/**
import { useReducer } from 'react';

function reducer(action, state) {
  if (action.type === 'increment') return { count: state.count + 1 };
  if (action.type === 'decrement') return { count: state.count - 1 };

  return state;
}

export default function AppPage() {
  let [state, dispatch] = useReducer(reducer, { count: 0 });
  return <button onClick={() => dispatch({ type: 'increment' })}>click</button>;
}
*/

function useReducer(reducer, initialState) {
  let [state, setState] = useState(initialState);

  const dispatch = (action) => {
    const newState = reducer(action, state);
    setState(newState);
  };

  return [state, dispatch];
}
