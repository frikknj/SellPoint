import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Profile extends Component {
  state = {};

  loggedin = true;

  // Function to decipher cookies and return the value belonging to the name you input
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleLogOut() {
    document.cookie = "token=";
    window.location.reload(false);
  }

  // Function that gets called whenever you load the page
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
        if (response.status / 100 >= 3) {
          this.loggedin = false;
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

  handleDelete = () => {
    const token = this.getCookie("token");
    fetch("http://localhost:8000/users/loggedin", {
      method: "DELETE",
      headers: {
        Authorization: "Token " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 204) {
        window.location.reload(false); // Reloads the page
      }
      console.log("response code: ", response.status);
      console.log(response.json());
    });
  };

  handleUpdate = () => {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;

    // TODO: Add validation. Make sure none of the fields are empty or in the wrong format

    const data = { first_name, last_name, email };

    const token = this.getCookie("token");
    fetch("http://localhost:8000/users/loggedin", {
      method: "PUT",
      headers: {
        Authorization: "Token " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // TODO: Do something depending on what the response code is
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      });
  };

  render() {
    if (!this.loggedin) {
      return <Redirect to="/Login" />;
    }
    return (
      <div className="MyProfile">
        <form>
          <h3> Min profil </h3>
          <div className="form-group">
            <label>Fornavn</label>
            <input
              type="text"
              id="first_name"
              className="form-control"
              placeholder={this.state.first_name}
            />
          </div>

          <div className="form-group">
            <label>Etternavn</label>
            <input
              id="last_name"
              type="text"
              className="form-control"
              placeholder={this.state.last_name}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder={this.state.email}
            />
          </div>
        </form>
        <button
          onClick={this.handleLogOut}
          className="btn btn-dark btn-lg btn-block"
        >
          Logg ut
        </button>
        <button
          onClick={this.handleUpdate}
          className="btn btn-dark btn-lg btn-block"
        >
          Oppdater
        </button>
        <button
          onClick={this.handleDelete}
          className="btn btn-danger btn-lg btn-block"
        >
          Slett
        </button>
      </div>
    );
  }
}
