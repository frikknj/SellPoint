import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavbarAdvertiser extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav
          className="navbar navbar-expand-lg navbar-light fixed-top"
          id="NavTop"
        >
          <div className="container">
            <Link className="navbar-brand" to={"/Login"} id="hjem">
              SellPoint
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/Annonser"} id="navbar">
                    Annonser
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Profile"} id="navbar">
                    Min profil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/Minereklamer"} id="navbar">
                    Mine reklamer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/lagreklame"} id="navbar">
                    Lag reklame
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavbarAdvertiser;
