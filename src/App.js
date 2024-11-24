import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Article from './components/Article'

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/:name?" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
      </Routes>
      </div>

  </Router>
  );
}

export default App;
