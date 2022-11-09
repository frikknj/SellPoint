import React, { Component } from "react";

export default class Annonser extends Component {
  state = {
    post: {},
    types: [{ type: "Selge" }, { type: "Kjøpe" }, { type: "Gi vekk" }],
    categories: [],
    image: null,
  };
  constructor(props) {
    super(props);
    this.clearType = this.clearType.bind(this);
  }

  // <p>Vår key er {this.props.match.params.key}</p>

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleAd = () => {
    const type = document.querySelector('input[name="trade type"]:checked')
      .value;
    const title = document.getElementById("title").value;
    //const picture = document.getElementById("picture").value;
    const advert_description = document.getElementById("advert_description")
      .value;
    const price = document.getElementById("price").value;
    const advert_location = document.getElementById("advert_location").value;
    const categorie = document.getElementById("categories").value;

    var formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("advert_description", advert_description);
    formData.append("price", price);
    formData.append("categorie", categorie);
    formData.append("advert_location", advert_location);
    if (this.state.image != null) {
      formData.append("image", this.state.image, this.state.image.name);
    }

    const token = this.getCookie("token");
    fetch(
      "http://localhost:8000/listings/" + this.props.match.params.key + "/",
      {
        method: "PUT",
        headers: {
          Authorization: "Token " + token,
        },
        body: formData,
      }
    ).then((response) => {
      if (response.status === 200) {
        alert("Du har oppdatert annonsen!");
      }
    });
  };

  clearType() {
    var post = { ...this.state.post };
    post.type = "";
    this.setState({ post });
  }

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
    const token = this.getCookie("token");
    fetch(
      "http://localhost:8000/listings/" + this.props.match.params.key + "/",
      {
        method: "GET",
        headers: {
          Authorization: "Token " + token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ post: data });
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="UpdateAdvert">
        <h3>Oppdater annonse</h3>

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
                    checked={
                      this.state.post.type === type.type ? "checked" : null
                    }
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
            defaultValue={this.state.post.title}
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
            defaultValue={this.state.post.advert_description}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Pris</label>
          <input
            id="price"
            type="text"
            className="form-control"
            defaultValue={this.state.post.price}
          />
        </div>

        <div className="form-group">
          <label>Sted</label>
          <input
            id="advert_location"
            type="text"
            className="form-control"
            defaultValue={this.state.post.advert_location}
          />
        </div>

        <div className="form-group">
          <label>Telefonnummer</label>
          <input
            id="contact"
            type="text"
            className="form-control"
            defaultValue={this.state.post.phone}
          />
        </div>
        <button
          onClick={this.handleAd}
          type="submit"
          className="btn btn-dark btn-lg btn-block"
        >
          Oppdater annonse
        </button>
      </div>
    );
  }
}
