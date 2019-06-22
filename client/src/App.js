import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import VideoScreen from './component/video-screen';
import Home from './component/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path='/' exact component={Home} />
        <Route path="/chat" exact component={VideoScreen} />
      </div>
    </Router>
  );
}

export default App;
