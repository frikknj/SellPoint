import React, { Component } from "react";

export default class Advertisement extends Component {
  getImg = () => {
    if (this.props.image === "http://localhost:8000null") {
      return null;
    } else {
      return (
        <img
          src={this.props.image}
          alt="ditt bilde her!"
          className="advertimage"
        />
      );
    }
  };
  render() {
    return (
      <div className="advertisement">
        <h3>{this.props.title}</h3> {this.getImg()}
        av: <br />{" "}
        <span className="company-name">{this.props.company_name}</span>
        <span className="advertisement-description">
          {this.props.description} <br /> <br />
          Reklame
        </span>
      </div>
    );
  }
}
