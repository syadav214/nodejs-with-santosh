import React, { Component } from 'react';
import Bill from './pages/Bill';

class App extends Component {
  render() {
    return (
      <div className="centerPage">
        <br />
        <div className="centerAlign">
          <h1>{process.env.REACT_APP_TITLE}</h1>
          <br />
        </div>
        <Bill />
      </div>
    );
  }
}

export default App;
