import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Brukerreg extends Component {
  render() {
    return (
      <div className="ChooseUserType">
        <h3>Registrer ny bruker!</h3>

        <Link style={{ color: "white" }} to={"/Bruker"}>
          <button className="btn btn-dark btn-lg btn-block">Bruker</button>
        </Link>
        <p></p>
        <Link style={{ color: "white" }} to={"/Annonsør"}>
          <button className="btn btn-dark btn-lg btn-block">Annonsør</button>
        </Link>
      </div>
    );
  }
}
