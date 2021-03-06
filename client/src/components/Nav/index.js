import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./style.css";

class Nav extends Component {
  constructor(props) {
    super();
    this.logout = this.logout.bind(this);
  }

  logout = (event) => {
    event.preventDefault();
    Axios.post("/user/logout").then((res) => {
      if (res.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        });
      }
    }).catch((err) => {
      console.log("Logout error");
      console.log(err);
    })
  }
  
  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Readient</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {loggedIn ? (
              <React.Fragment>
                <li className="nav-item">
                  <p className="navbar-text m-0 px-1">Hi {this.props.username}!</p>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Search</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/saved">Saved</Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link m-0" id="logout-link" onClick={this.logout}>Logout</p>
                </li>
                
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;