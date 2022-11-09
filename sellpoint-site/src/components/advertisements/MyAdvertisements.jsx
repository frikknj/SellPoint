import React, { Component } from "react";
import Advertisement from "./Advertisement";

export default class MyAdvertisements extends Component {
  state = {
    advertisements: [],
  };

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  componentDidMount() {
    const token = this.getCookie("token");
    var success;
    fetch("http://localhost:8000/listings/advertisements/own", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        success = response.ok;
        return response.json();
      })
      .then((data) => {
        if (success) {
          this.setState({ advertisements: data });
          console.log(this.state);
        }
      });
  }

  render() {
    return (
      <div className="advertisement-overview">
        <h1>Mine reklamer</h1>
        {this.state.advertisements.map((advertisement) => {
          return (
            <div>
              <Advertisement
                title={advertisement.title}
                description={advertisement.advertisement_description}
                company_name={advertisement.company_name}
                image={"http://localhost:8000" + advertisement.image}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
