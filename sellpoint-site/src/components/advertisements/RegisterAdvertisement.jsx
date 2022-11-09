import React, { Component } from "react";

export default class RegisterAdvertisement extends Component {
  state = {
    image: null,
  };

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleImageChange = async (e) => {
    await this.setState({
      image: e.target.files[0],
    });
    console.log(this.state.image);
  };

  componentDidMount() {
    // fetching the user
    const token = this.getCookie("token");
    fetch("http://localhost:8000/users/loggedin", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ company_name: data.company_name });
      });
  }

  handleRegisterAdvertisement = () => {
    var title, advertisement_description, company_name;
    try {
      title = document.getElementById("title").value;
      advertisement_description = document.getElementById(
        "advertisement_description"
      ).value;
      title = document.getElementById("title").value;
      company_name = this.state.company_name;
    } catch (err) {
      console.log(err);
      alert("Alle felter må være utfylte!");
      return;
    }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("advertisement_description", advertisement_description);
    formData.append("company_name", company_name);
    if (this.state.image != null) {
      formData.append("image", this.state.image, this.state.image.name);
    }
    var success;
    const token = this.getCookie("token");
    fetch("http://localhost:8000/listings/advertisements", {
      method: "POST",
      headers: {
        Authorization: "Token " + token,
      },
      body: formData,
    })
      .then((response) => {
        success = response.ok;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (success) {
          alert("Reklamen har blitt laget!");
        }
      });
  };

  render() {
    return (
      <div className="RegisterAdvert">
        <h3>Registrer ny reklame</h3>

        <div className="form-group">
          <label>Overskrift</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder=""
          />
        </div>

        <div className="form-group">
          <label>Last opp bilde</label>
          <p></p>
          <input
            type="file"
            accept="image/*"
            id="image"
            onChange={this.handleImageChange}
          />
        </div>

        <div className="form-group">
          <label>Tekst</label>
          <textarea
            id="advertisement_description"
            className="form-control"
            rows={10}
            cols={5}
          ></textarea>
        </div>

        <p></p>
        <button
          onClick={this.handleRegisterAdvertisement}
          type="submit"
          className="btn btn-dark btn-lg btn-block"
        >
          Lag reklame
        </button>
      </div>
    );
  }
}
