import React from "react"
import Home from "./pages/home"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Landing from "./pages/Intro/Landing";
const routes = (
  <Router>
  <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/dashboard" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    </Routes>
    </Router>
);

 
function App() {
 

  return (
    <>
      <div>{routes}</div>
    </>
  )
}

export default App
