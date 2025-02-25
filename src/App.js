
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Pgnf from './components/Pgnf';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<Pgnf></Pgnf>}></Route>
      </Routes>
    </div>
  );
}

export default App;
