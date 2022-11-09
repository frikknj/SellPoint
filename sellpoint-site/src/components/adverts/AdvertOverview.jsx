import React, { Component } from "react";
import Advertisement from "../advertisements/Advertisement";
import Post from "./Advert";

export default class Posts extends Component {
  state = {
    posts: [],
    listingUrl: "http://localhost:8000/listings/",
    categories: [],
    advertisement: {
      title: "Din reklame kan komme hit!",
      advertisement_description:
        "Her kan du få din reklame! Lag en annonsør-bruker og lag din reklame!",
      company_name: "Sellpoint Staff",
    },
  };

  constructor(props) {
    super(props);
    this.handleSort = this.handleSort.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    // Fetching the categories
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  updateSite() {
    this.setState(this.state);
  }

  handleSort() {
    var sortingType = "";
    if (document.getElementById("sorting")) {
      sortingType = document.getElementById("sorting").value;
    }

    var sortingFunction = (a, b) =>
      a.advert_location.localeCompare(b.advert_location);
    if (sortingType === "Pris") {
      sortingFunction = (a, b) => a.price - b.price;
    }

    return this.state.posts.sort(sortingFunction).map((post) => {
      return (
        <Post
          price={post.price}
          title={post.title}
          description={post.advert_description}
          location={post.advert_location}
          seller={post.seller}
          type={post.type}
          category={post.categorie}
          image={"http://localhost:8000" + post.image}
          phone_number={post.phone_number}
          key={post.id}
        />
      );
    });
  }

  updateCategory() {
    var filterCategory = "";
    if (document.getElementById("filtering")) {
      filterCategory = document.getElementById("filtering").value;
    }
    this.setState(
      {
        listingUrl: "http://localhost:8000/listings/category/" + filterCategory,
      },
      function () {
        this.componentDidMount();
      }
    );
  }

  componentDidMount() {
    const token = this.getCookie("token");
    var success;
    fetch(this.state.listingUrl, {
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
          this.setState({ posts: data });
        }
      });
    fetch("http://localhost:8000/listings/categories", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ categories: data });
      });
    fetch("http://localhost:8000/listings/advertisements/random", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ advertisement: data });
      });
  }

  render() {
    return (
      <div className="Advert">
        <h1>Annonser</h1>
        <select id="sorting" onChange={this.updateSite} defaultValue="Sorter">
          <option disabled value="Sorter">
            {" "}
            Sorter{" "}
          </option>
          <option value="Pris"> Pris </option>
          <option value="Avstand"> Avstand </option>
        </select>
        <select
          id="filtering"
          onChange={this.updateCategory}
          defaultValue="Kategori"
        >
          <option disabled value="Kategori">
            {" "}
            Kategori{" "}
          </option>
          {this.state.categories.map((category) => {
            return (
              <option key={category[0]} value={category[0]}>
                {category[1]}
              </option>
            );
          })}
        </select>
        <div className="row-container">
          <div className="advert-box">{this.handleSort()}</div>
          <div className="advertisement-box">
            <Advertisement
              title={this.state.advertisement.title}
              description={this.state.advertisement.advertisement_description}
              image={"http://localhost:8000" + this.state.advertisement.image}
              company_name={this.state.advertisement.company_name}
            />{" "}
          </div>
        </div>
      </div>
    );
  }
}
