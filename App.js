import React from 'react';
import CheckboxTree from './CheckboxTree';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Nested Checkbox Demo</h1>
      </header>
      <main className="main">
        <CheckboxTree />
      </main>
    </div>
  );
}

export default App;
