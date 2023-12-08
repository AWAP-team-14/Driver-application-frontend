import React from "react";

export default function Footer() {
  return (
    <div className="bg-dark text-light">
      <footer className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <p className="mb-0">&copy; 2023 GoParcel. All rights reserved.</p>
          </div>
          <div className="col-md-4">
            <ul className="list-unstyled d-flex justify-content-around mb-0"></ul>
          </div>
          <div className="col-md-4">
            <p className="mb-0 text-end">
              Designed with <span className="text-danger">&#10084;</span> by
              GoParcel Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
