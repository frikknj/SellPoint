import React, { Component } from "react";

export default class Annonser extends Component {
  state = {
    categories: [],
    types: [{ type: "Selge" }, { type: "Kjøpe" }, { type: "Gi vekk" }],
    image: null,
  };

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleAd = () => {
    var type,
      title,
      advert_description,
      price,
      advert_location,
      categorie,
      phone_number;
    try {
      type = document.querySelector('input[name="trade type"]:checked').value;
      title = document.getElementById("title").value;
      //const picture = document.getelementbyid("picture").value;
      advert_description = document.getElementById("advert_description").value;
      price = document.getElementById("price").value;
      advert_location = document.getElementById("advert_location").value;
      categorie = document.getElementById("categories").value;
      phone_number = document.getElementById("phone_number").value;
    } catch (err) {
      console.log(err);
      alert("Alle felter må være utfylte!");
      return;
    }

    var formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("advert_description", advert_description);
    formData.append("price", price);
    formData.append("categorie", categorie);
    formData.append("advert_location", advert_location);
    formData.append("phone_number", phone_number);
    if (this.state.image != null) {
      formData.append("image", this.state.image, this.state.image.name);
    }

    var success;

    const token = this.getCookie("token");
    fetch("http://localhost:8000/listings/", {
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
          alert("Annonsen har blitt laget!");
        }
      });
  };

  handleImageChange = async (e) => {
    await this.setState({
      image: e.target.files[0],
    });
    console.log(this.state.image);
  };

  componentDidMount() {
    fetch("http://localhost:8000/listings/categories", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ categories: data });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="RegisterAdvert">
        <h3>Registrer ny annonse</h3>

        <div className="form-group">
          <p>Jeg vil:</p>
          <div id="trade_type">
            {this.state.types.map((type) => {
              return (
                <div class="input-toggle">
                  <input
                    type="radio"
                    name="trade type"
                    value={type.type}
                    onChange={this.clearType}
                    id={type.type}
                  />
                  <label for={type.type}> {type.type}</label>
                </div>
              );
            })}
          </div>
        </div>
        <select name="categories" id="categories">
          {this.state.categories.map((category) => {
            return <option value={category[0]}>{category[0]}</option>;
          })}
        </select>

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
            id="advert_description"
            className="form-control"
            rows={10}
            cols={5}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Pris</label>
          <input
            id="price"
            type="number"
            className="form-control"
            placeholder="Kr."
          />
        </div>

        <div className="form-group">
          <label>Sted</label>
          <input id="advert_location" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Telefonnummer/kontaktinfo</label>
          <input id="phone_number" type="number" className="form-control" />
        </div>

        <p></p>
        <button
          onClick={this.handleAd}
          type="submit"
          className="btn btn-dark btn-lg btn-block"
        >
          Lag annonse
        </button>
      </div>
    );
  }
}
