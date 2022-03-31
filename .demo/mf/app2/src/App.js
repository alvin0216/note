import React from 'react';
import Button from './Button';
const RemoteButton = React.lazy(() => import('app1/Button'));

const App = (props) => {
  return (
    <>
      <h2>app 2</h2>
      <Button />
      <React.Suspense fallback='Loading Button'>
        <RemoteButton />
      </React.Suspense>
    </>
  );
};

export default App;
