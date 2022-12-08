// import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookYourCar from './pages/BookYourCar';


function App() {
  return (
    <div className="App">
      <Router>
<Routes>
          <Route path='/' element={
            (localStorage.getItem('user')) ? (
              <Home />
            ) : (
              <Navigate replace to="/login" />
            ) }
          exact
            />
          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/bookyourcar' element={
            (localStorage.getItem('user')) ? (
              <BookYourCar/>
            ) : (      
              <Navigate replace to="/login" />
            ) } exact  />
</Routes>
      </Router>
    </div>
  );
}

export default App;

