import './index.css';
import Demo1 from './Demo1';
import Demo2 from './Demo2';

const App = () => (
  <div>
    <div className='flex demo-list'>
      <Demo1 />
      <Demo2 />
    </div>
  </div>
);

export default App;
