import React, { Component } from "react";
import Post from "./Advert";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  state = {
    posts: [],
  };

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  componentDidMount() {
    const token = this.getCookie("token");
    var success;
    fetch("http://localhost:8000/listings/own/", {
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
  }

  render() {
    return (
      <div className="myadverts">
        <h1>Annonser</h1>
        {this.state.posts.map((post) => {
          return (
            <div>
              <Post
                price={post.price}
                title={post.title}
                description={post.advert_description}
                location={post.advert_location}
                seller={post.seller}
                type={post.type}
                category={post.categorie}
                phone_number={post.phone_number}
                image={"http://localhost:8000" + post.image}
              />
              <Link to={"/OppdaterAnnonse/" + post.id}>
                <button className="btn btn-success">Endre</button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
