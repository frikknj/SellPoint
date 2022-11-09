import React, { Component } from "react";

export default class OtherProfile extends Component {
  state = {};

  // Function to decipher cookies and return the value belonging to the name you input
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Function that gets called whenever you load the page
  componentDidMount = () => {
    const token = this.getCookie("token");

    fetch("http://localhost:8000/users/" + this.props.match.params.key + "", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        console.log(response);
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

  render() {
    return (
      <div className="MyProfile">
        <h3>{this.state.first_name + " " + this.state.last_name}</h3>
        <p>Kontakt: {this.state.email}</p>
      </div>
    );
  }
}
