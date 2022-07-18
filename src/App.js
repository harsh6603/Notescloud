import Navbar from './components/Navbar';
import NoteState from './context/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/about"} element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
