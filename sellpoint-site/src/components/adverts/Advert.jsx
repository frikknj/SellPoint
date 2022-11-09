import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Post extends Component {
  state = {
    seller_name: "",
  };
  getImg = () => {
    if (this.props.image === "http://localhost:8000null") {
      return null;
    } else {
      return (
        <img
          src={this.props.image}
          alt="annonsebilde"
          className="advertimage"
        />
      );
    }
  };
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  componentDidMount() {
    const token = this.getCookie("token");
    fetch("http://localhost:8000/users/" + this.props.seller + "", {
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
          seller_name: data.first_name + " " + data.last_name,
        });
        console.log(data);
      });
  }

  render() {
    return (
      <div className="post">
        <h3>{this.props.title}</h3> {this.getImg()}
        <p className="location"> Sted: {this.props.location}</p>
        <div className="row">
          <div className="col-6">
            Pris: {this.props.price} ,- <br />
            Type: {this.props.type} <br />
            Tlf: {this.props.phone_number}
          </div>
          <div className="col-6">
            Kategori: {this.props.category} <br /> <br />
            Selger: <br />
            <Link to={"/otherprofile/" + this.props.seller}>
              <button className="btn btn-warning">
                {this.state.seller_name}
              </button>
            </Link>{" "}
            <br />
          </div>
        </div>
        <p className="advert-description">{this.props.description}</p>
      </div>
    );
  }
}
