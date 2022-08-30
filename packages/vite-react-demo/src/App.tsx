import { useState } from 'react';

interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(18);

  const runSetState = () => {
    setCount((prev) => prev + 1);
    setAge((prev) => prev + 1);
  };

  const trigger = (isBatchedUpdate: boolean) => {
    if (isBatchedUpdate) {
      runSetState();
    } else {
      Promise.resolve().then(() => {
        runSetState();
      });
      // setTimeout(runSetState, 0);
    }
  };

  console.log('render');
  return (
    <>
      {count} - {age}
      <button onClick={() => trigger(true)}>触发合成事件</button>
      <button onClick={() => trigger(false)}>触发 setTimeout 事件</button>
    </>
  );
};

export default App;
