import logo from './logo.svg';
import './App.css';
import Typewriter from 'typewriter-effect';

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <Typewriter
  options={{
    strings: ['Hello', 'World'],
    autoStart: true,
    loop: true,
  }}
/>
    </div>
  );
}

export default App;
