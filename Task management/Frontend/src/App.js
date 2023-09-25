import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './layout/login';
import Dashboard from './layout/dashboard';
import Signup from './layout/signup';

 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element = {<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/dashboard" element = {<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;