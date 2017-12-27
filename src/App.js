import React, { Component } from 'react';
import './App.css';
import TodoInput from './components/TodoInput/TodoInput'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          todos
        </header>
        <div className="App-body">
          <TodoInput />
        </div>
      </div>
    );
  }
}

export default App;
