import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Landings from './components/Landings';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav>
             <NavLink to='/' exact activeStyle={
               {color:'green'}}>
               Landing
               </NavLink>
             <NavLink to='/library' exact activeStyle={
               {color:'green'}}>
               Library</NavLink>

           </nav>
          <img className="logo" src="assets/images/menupics/bloc_jams_logo.png" alt="Bloc Jams logo"/>
        </header>

        <main>
          <Route exact path="/" component={Landings} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>

      </div>
    );
  }
}

export default App;
