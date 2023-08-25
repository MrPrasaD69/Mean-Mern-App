// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Update from './components/Update';
import Upload from './components/Upload';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/update" element={<Update/>} />
        <Route path="/upload" element={<Upload/>}/>
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>      
    </BrowserRouter>
    
  );
}

export default App;
