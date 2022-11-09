import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/users/Login";
import Brukerreg from "./components/user-registration/ChooseUserType";
import Profile from "./components/users/MyProfile";
import Bruker from "./components/user-registration/RegisterUser";
import Annonsør from "./components/user-registration/RegisterAdvertiser";
import Annonser from "./components/adverts/RegisterAdvert";
import AdvertOverview from "./components/adverts/AdvertOverview";
import MyAdverts from "./components/adverts/MyAdverts";
import UpdateAdvert from "./components/adverts/UpdateAdvert";
import Navbar from "./components/navigation/Navbar";
import RegisterAdvert from "./components/advertisements/RegisterAdvertisement";
import MyAdvertisements from "./components/advertisements/MyAdvertisements";
import OtherProfile from "./components/users/OtherProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="outer">
          <Switch>
            <Route path="/Brukerreg" component={Brukerreg} />
            <Route path="/Profile" component={Profile} />
            <Route path="/Bruker" component={Bruker} />
            <Route path="/Annonsør" component={Annonsør} />
            <Route path="/Login" component={Login} />
            <Route path="/LagAnnonse" component={Annonser} />
            <Route path="/Annonser" component={AdvertOverview} />
            <Route path="/MineAnnonser" component={MyAdverts} />
            <Route path="/OppdaterAnnonse/:key" component={UpdateAdvert} />
            <Route path="/lagreklame/" component={RegisterAdvert} />
            <Route path="/minereklamer/" component={MyAdvertisements} />
            <Route path="/otherprofile/:key" component={OtherProfile} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
