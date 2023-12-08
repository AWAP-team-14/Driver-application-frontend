import React from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DriverLogin from "../controller/driverLogin";

export default function Home() {
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
      <div className="container" style={{ paddingTop: "10px" }}>
        {localStorage.getItem("token") && (
          <div style={{ paddingBottom: "352px" }}>
            <h2 className="display-4 fw-bold text-black text-center">
              Welcome to Driver Application
            </h2>
          </div>
        )}
        {!localStorage.getItem("token") && (
          <div>
            <DriverLogin />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
