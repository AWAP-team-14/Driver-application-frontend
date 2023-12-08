import React from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TrackParcel from "../controller/pickUpParcel";

export default function PickUp() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="background-image"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/premium-vector/delivery-van-with-cardboard-boxes-white-background-online-delivery-service_2963-432.jpg?w=826")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div>
        <TrackParcel />
      </div>
      <div className="container" style={{ paddingTop: "10px" }}></div>
      <Footer />
    </div>
  );
}
