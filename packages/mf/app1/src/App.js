import React from 'react';
import Button from './Button';
const RemoteButton = React.lazy(() => import('app2/Button'));

const App = (props) => {
  return (
    <>
      <h2>app 1</h2>
      <Button />
      <React.Suspense fallback='Loading Button'>
        <RemoteButton />
      </React.Suspense>
    </>
  );
};

export default App;
