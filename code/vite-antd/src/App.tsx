import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';
import { Button } from 'antd';
import { useImmer } from 'use-immer';
import ProComponent from './ProComponent';

function App() {
  const [count, setCount] = useState(0);
  const [info, updateInfo] = useImmer({ name: 'Alvin', age: 18 });

  return (
    <div className='App'>
      <div className='text-center'>
        <img src={reactLogo} className='logo react' alt='React logo' />
        <h1 className='c-#f00'>Vite + React</h1>
        <Button type='primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button
          className='ml-1'
          onClick={() => {
            updateInfo((d) => {
              d.age++;
            });
          }}>
          age++
        </Button>
      </div>
      <div className='mt-4 flex '>
        <pre className='text-left m-auto'>{JSON.stringify(info, null, 2)}</pre>
      </div>

      <ProComponent />
    </div>
  );
}

export default App;
