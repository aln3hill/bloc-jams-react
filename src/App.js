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
        <header className="header">

          <img className="logo" src="assets/images/menupics/bloc_jams_logo.png" alt="Bloc Jams logo"/>
          <h1 className="logoText">Bloc <span id="jams">Jams</span></h1>
          <nav className="navigation">
               <NavLink to='/' exact className="navlink">
                 Home
                 </NavLink>
               <NavLink to='/library' exact className="navlink">
                 Library</NavLink>

             </nav>
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
