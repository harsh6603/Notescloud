import NoteState from "./context/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
// import Trash from './components/Trash';
import Login from './components/Login';
import WithoutNav from './WithoutNav';
import WithNav from './WithNav';
import Signup from './components/Signup';
import { useEffect, useState } from "react";

function App() {

  const [label, setLabel] = useState([]);
  // let add = localStorage.getItem("labels");
  // let labels = add.split(",");
  // console.log(labels);
  // setLabel(labels);
  
  function checkUserData()
  {
    if (localStorage.getItem("token")) {
      let label = localStorage.getItem("labels");
      let labels = label.split(",");
      console.log(labels);
      setLabel(labels);
    }
  }
  useEffect(() => {
        
    window.addEventListener('storage', checkUserData)
    return () => {
      if (localStorage.getItem("token")) {
        let label = localStorage.getItem("labels");
        let labels = label.split(",");
        console.log(labels);
        setLabel(labels);
      }
      window.removeEventListener('storage', checkUserData)
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div className="App">
      <Router>
        <NoteState checkUserData={checkUserData}>
          <Routes>
            <Route element={<WithNav />}>
              <Route exact path={"/"} element={<Home />} />
              <Route exact path={"/archive"} element={<Home />} />
              <Route exact path={"/about"} element={<About />} />
              {localStorage.getItem("token") && label.map((storedLabel) => {
                // console.log(storedLabel)
                return <Route key={storedLabel} exact path={`/${storedLabel}`} element={<Home />} />
              })}
              <Route exact path={"/trash"} element={<Home />} />
              {/* <Route exact path={"/trash"} element={<Trash />} /> */}
            </Route>
            <Route element={<WithoutNav />}>
              <Route exact path={"/login"} element={<Login />} />
              <Route exact path={"/signup"} element={<Signup />} />
            </Route>
          </Routes>
        </NoteState>
      </Router>
    </div>
  );
}

export default App;
