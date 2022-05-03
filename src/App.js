import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
  <Router>
        <Routes>
          <Route  path="/" element={<Login/>}/>
          <Route  path="/home" element={<Header/>}/>
        </Routes>
</Router>
    </div>
  );
}

export default App;