// import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';


import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookYourCar from './pages/BookYourCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';


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

<Route path='/addcar' element={
            (localStorage.getItem('user')) ? (
              <AddCar />
            ) : (
              <Navigate replace to="/login" />
            ) }
          exact
            />

<Route path='/editcar/:carid' element={
            (localStorage.getItem('user')) ? (
              <EditCar />
            ) : (
              <Navigate replace to="/login" />
            ) }
          exact
            />


<Route path='/admin' element={
            (localStorage.getItem('user')) ? (
              <AdminHome />
            ) : (
              <Navigate replace to="/login" />
            ) }
          exact
            />

          <Route path='/login' exact element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/booking/:carid' element={
            (localStorage.getItem('user')) ? (
             
                <BookYourCar />
             
            ) : (      
              <Navigate replace to="/login" />
            ) } exact  />


            <Route path='/userbookings' element={
              (localStorage.getItem('user')) ? (
                <UserBookings />
              ) : (
                <Navigate replace to="/login" />
              ) }
            exact
              />
</Routes>

      </Router>
    </div>
  );
}

export default App;

