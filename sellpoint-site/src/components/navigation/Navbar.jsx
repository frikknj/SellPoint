import React, { Component } from "react";
import NavbarAdvertiser from "./NavbarAdvertiser";
import NavbarBefore from "./NavbarBeforeLogin";
import NavbarUser from "./NavbarUser";

class Navbar extends Component {
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
          is_advertiser: data.is_advertiser,
        });
        console.log(data);
      });
  };

  render() {
    if (!this.loggedin) {
      return <NavbarBefore />;
    } else if (!this.state.is_advertiser) {
      return <NavbarUser />;
    }
    return <NavbarAdvertiser />;
  }
}

export default Navbar;
