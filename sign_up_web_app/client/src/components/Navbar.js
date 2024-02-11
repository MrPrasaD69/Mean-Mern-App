import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('userData');
  const handleLogout = () => {
    window.localStorage.removeItem('userData');
    navigate("/login");
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-dark bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={token ? "/dashboard" : "#"}>
            REACT APP
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">

              {!token ? (
                <>
                  <NavLink className="nav-link" to="/login" activeclassname="active">
                    Login
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </>
              ) : ''}

              {token ? (
                <>
                  <NavLink
                    className="nav-link"
                    to="/dashboard"
                    activeclassname="active"
                  >
                    DASHBOARD
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/upload"
                    activeclassname="active"
                  >
                    Upload
                  </NavLink>
                  <button className="btn-primary btn-sm" onClick={() => handleLogout()}>LOGOUT</button>
                </>
              ) : ''}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
