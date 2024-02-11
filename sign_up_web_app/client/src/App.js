// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route, Link,useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Update from "./components/Update";
import Upload from "./components/Upload";
import Login from "./components/Login";
import _404 from "./components/_404";
function App() {
  const token = window.localStorage.getItem("userData");
  // const nav = useNavigate();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update" element={<Update />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;