import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ Dash }) {
  console.log("dash", Dash);
  return (
    <nav className="navbar navbar-expand-md  mb-4 header fixed-top d-flex align-items-center">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                activeClassName="active"
                className="nav-link"
                to="/adge/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/adge/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/adge/audit-report"
              >
                Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/history">
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/certificate">
                Certificates
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/action">
                Action Plan
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
