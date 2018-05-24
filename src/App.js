import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Landings from './components/Landings';
import Library from './components/Library';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav>
             <Link to='/'>Landing</Link>
             <Link to='/library'>Library</Link>
           </nav>
          <h1>Bloc Jams</h1>
        </header>

        <main>
          <Route exact path="/" component={Landings} />
          <Route path="/library" component={Library} />
        </main>

      </div>
    );
  }
}

export default App;
