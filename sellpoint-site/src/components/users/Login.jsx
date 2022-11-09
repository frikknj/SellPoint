import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {};

  loggedin = false;

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  componentDidMount = () => {
    const token = this.getCookie("token");

    fetch("http://localhost:8000/users/loggedin", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        console.log(response);
        console.log("response code: ", response.status);
        if (!(response.status / 100 >= 3)) {
          this.loggedin = true;
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
        console.log(data);
      });
  };

  handleLogin = () => {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { username, password };

    fetch("http://localhost:8000/users/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        document.cookie = "token=" + data.token;
        window.location.reload(false);
      });
  };

  render() {
    if (this.loggedin) {
      return <Redirect to="/Annonser" />;
    }
    return (
      <div className="Login-site">
        <h3>Velkommen</h3>

        <div className="form-group">
          <label>E-post</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder=" ... "
          />
        </div>

        <div className="form-group">
          <label>Passord</label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder=" ... "
          />
        </div>

        <button
          onClick={this.handleLogin}
          type="submit"
          className="btn btn-dark btn-lg btn-block"
        >
          Logg inn!
        </button>
      </div>
    );
  }
}
