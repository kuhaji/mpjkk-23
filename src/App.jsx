import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Layout from './views/Layout';
import Home from './views/Home';
import Single from './views/Single';
import Profile from './views/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/single" element={<Single />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
