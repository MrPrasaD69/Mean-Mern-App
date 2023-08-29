import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/dashboard">REACT APP</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/dashboard" activeclassname="active">DASHBOARD</NavLink>
                    <NavLink className="nav-link" to="/register" activeclassname="active">Register</NavLink>
                    <NavLink className="nav-link" to="/upload" activeclassname="active">Upload</NavLink>
                    
                </div>
                </div>
            </div>
        </nav>
        
    </div>
  )
}

export default Navbar