import React, { Component } from "react";

export default class Annonsør extends Component {
  state = {};

  submitForm = () => {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    function validationPassword() {
      if (password !== password2) {
        alert("Passordene stemmer ikke overens");
      } else if (password === "" || password2 === "") {
        alert("Passordene må stemme overens");
      }
    }
    validationPassword();

    function validateEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var email = document.getElementById("email").value;
      if (!re.test(email)) {
        alert("Feil format på email");
      }
    }
    validateEmail();

    function validateName() {
      var regName = /^[a-zA-Z]+$/;
      var first_name = document.getElementById("first_name").value;
      var last_name = document.getElementById("last_name").value;
      if (!regName.test(first_name) || !regName.test(last_name)) {
        alert("Feil format på navn/etternavn.");
      }
    }
    validateName();

    const data = { first_name, last_name, email, password };
    console.log(data);

    fetch("http://localhost:8000/users/register/user", {
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
        console.log(data.token);
        document.cookie = "token=" + data.token;
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div className="Register">
        <form>
          <h3> Registrer ny bruker! </h3>
          <div className="form-group">
            <label>Fornavn</label>
            <input
              type="text"
              id="first_name"
              className="form-control"
              placeholder=" Fornavn "
            />
          </div>

          <div className="form-group">
            <label>Etternavn</label>
            <input
              id="last_name"
              type="text"
              className="form-control"
              placeholder=" ... "
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder=" ... "
            />
          </div>

          <div className="form-group">
            <label>Passord</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder=" ... "
            />
          </div>

          <div className="form-group">
            <label>Bekreft passord</label>
            <input
              id="password2"
              type="password"
              className="form-control"
              placeholder=" ... "
            />
          </div>

          <p className="forgot-password text-right">
            Allerede bruker? <a href="/Login">logg inn!</a>
          </p>
        </form>
        <button
          className="btn btn-dark btn-lg btn-block"
          onClick={this.submitForm}
        >
          Registrer!
        </button>
      </div>
    );
  }
}
