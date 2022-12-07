// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookYourCar from './pages/BookYourCar';


function App() {
  return (
    <div className="App">
      <Router>
<Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/bookyourcar' exact element={<BookYourCar/>} />
</Routes>
      </Router>
    </div>
  );
}

export default App;
