import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
        style={{
          boxShadow: "0px 10px 20px black",
          filter: "blur(20)",
          position: "fixed",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/home ">
            GoParcel
          </Link>
          <span
            style={{
              fontSize: "20px",
              paddingLeft: "40px",
              paddingRight: "40px",
              paddingTop: "12px",
              color: "black",
              fontWeight: "bold",
            }}
          ></span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/">
                  Login
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/pickup">
                  Need to Drop
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/dropoff">
                  Need to Pick
                </Link>
                <button
                  className="bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
