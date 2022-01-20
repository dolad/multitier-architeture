import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { isAuth } from "../util/helper";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light header__bg-color">
      <Link className="navbar-brand" to="/">
          {" "}
         <img src={Logo} alt="" />
        </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/running-jobs">
                Running Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/artisian">
                Become an Artisian
              </Link>
            </li>
            {
              !isAuth() ?  <li id="signup">
              <Link to="/login">Login</Link> 
            </li> : null 
            }
             {
              !isAuth() ?  <li id="signup">
              <Link to="/registration">Register</Link> 
            </li> : null 
            }
           
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;