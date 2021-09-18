import React, { Component } from "react";
// import './App.css';
import { longdo, map, LongdoMap } from "./LongdoMap";
//replace a LongdoMap.js file
import firebase from "../Firebase/firebase";
import {UserID} from "../Components/InputHistory"
class Map_MUser extends Component {
  constructor(props) {
    super(props);
    //this.initMap = this.initMap.bind(this);

    this.state = {
      lat: "",
      lon: "xxxxxxxxxxx",
    };
  }
  initMap() {
    map.Layers.setBase(longdo.Layers.GRAY);
    map.location({ lon: 98.98558795452118, lat: 18.79534948277713 }, true);
    map.zoom(14, true);

    var marker = new longdo.Marker({
      lon: 98.98558795452118,
      lat: 18.79534948277713,
    });
    // var marker = new longdo.Marker({ lon: 98.98636043071747, lat: 18.781719875418624 });
    // map.Overlays.add(marker);

    map.Event.bind("location", function () {
      var location = map.location(); // Cross hair location
      /* console.log("555: "+location); */
    });
    map.Event.bind("click", function () {
      var mouseLocation = map.location(longdo.LocationMode.Pointer);
      map.Overlays.add(new longdo.Marker(mouseLocation));
      console.log("mouseLocation", mouseLocation);
      console.log("mouseLocationLat", mouseLocation.lat);
      console.log("mouseLocationLon", mouseLocation.lon);
      localStorage.setItem("lat", mouseLocation.lat);
      localStorage.setItem("lon", mouseLocation.lon);
      const dataLocation = firebase.database().ref("Location_Map");
      const data = {
        lat: mouseLocation.lat,
        lon: mouseLocation.lon,
        UserID:UserID
      };
      dataLocation.push(data);
      
    });
    console.log("lonTest: ", localStorage.getItem("lon"));
    console.log("Passing UserID",UserID)
  }
  render() {
    const mapKey = "4944f8898ff36cf1c3cee44290fca0f9";
    return (
      <div>
        <LongdoMap id="longdo-map" mapKey={mapKey} callback={this.initMap} />
        {/* <p>{LAT} {LON}</p> */}
        {console.log("locationlat: ", this.state.lat)}
        {console.log("locationlat", this.state.lon)}
        {console.log("Passing UserID",this.props.UserID)}
      </div>
    );
  }
}

export default Map_MUser;
