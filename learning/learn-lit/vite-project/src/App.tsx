import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <my-element>
        <h1>web Components</h1>
      </my-element>
    </div>
  );
}

export default App;
