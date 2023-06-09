import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, Redirect, Switch } from 'react-router-dom';
import Customers from './components/customers';
import Movies from './components/movie';
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/registerForm';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
    <NavBar/>
    <main className='container'>
      <Switch>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Route path="/movies/:id" component={MovieForm}/>
        <Route path="/movies" component={Movies}></Route>
        <Route path="/customers" component={Customers}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/movies"/>
        <Redirect to="not-found"/>
      </Switch>
    </main>
    </React.Fragment>
  );
}

export default App;
