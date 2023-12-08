import React, { useEffect, useState, useRef } from "react";

const TrackParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const isMounted = useRef(true);

  const handleTrack = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/createparcel`,
        {
          method: "GET",
          headers: {
            auth_token: "parcelsender",
            status: "Sender Droped the Parcel in Locker",
          },
        }
      );

      if (!isMounted.current) {
        return;
      }

      const json = await response.json();

      if (json.success) {
        setParcels(json.response || []);
      }

      setLoading(false);
    } catch (error) {
      alert("An error occurred:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    isMounted.current = true;

    if (selectedAddress) {
      // Fetch parcels only when an address is selected
      handleTrack();
    }

    return () => {
      isMounted.current = false;
    };
  }, [selectedAddress]);
  const handleUpdateStatus = async (parcelId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/createparcel/updateparcelstatus/${parcelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            auth_token: "parcelsender",
          },
          body: JSON.stringify({ status: "Driver Picked Up Parcel" }), // Set the new status here
        }
      );

      const json = await response.json();

      if (json.success) {
        // Update the parcel status locally
        setParcels((prevParcels) =>
          prevParcels.map((parcel) =>
            parcel._id === parcelId
              ? { ...parcel, status: "Driver Picked Up Parcel" }
              : parcel
          )
        );
        alert("Parcel status updated successfully");
        setParcels((prevParcels) =>
          prevParcels.filter((parcel) => parcel._id !== parcelId)
        );
      } else {
        alert("Failed to update parcel status");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred:", error);
    }
  };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const filteredParcels = selectedAddress
    ? parcels.filter((parcel) => parcel.sender.address === selectedAddress)
    : parcels;

  return (
    <div className="container mt-1">
      <div
        style={{
          color: "black",
          fontWeight: "bold",
          paddingTop: "10px",
        }}
      >
        <p>Select your location:</p>
        {["Oulu", "Helsinki", "Tampere", "Turku", "Kuopio"].map((address) => (
          <button
            key={address}
            onClick={() => handleAddressClick(address)}
            style={{
              fontWeight: "bold",
              color: "black",
              margin: "0 5px",
              backgroundColor:
                selectedAddress === address ? "rgb(72, 135, 248)" : "white",
            }}
          >
            {address}
          </button>
        ))}
      </div>
      {loading ? (
        <p
          style={{
            color: "red",
            paddingTop: "10px",
            fontWeight: "bold",
          }}
        >
          Location not selected
        </p>
      ) : (
        <div>
          {filteredParcels.length === 0 ? (
            <p
              style={{
                color: "black",
                paddingTop: "10px",
              }}
            >
              No parcel data found
            </p>
          ) : (
            <div
              style={{
                paddingTop: "10px",
              }}
            >
              {filteredParcels.map((parcel, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(72, 135, 248)",
                              fontSize: "20px",
                            }}
                          >
                            Sender Information
                          </p>
                          <p>Name: {parcel.sender.name}</p>
                          <p>Address: {parcel.sender.address}</p>
                          <p>Locker Number: {parcel.senderCabinet}</p>
                          <p>Mobile: {parcel.sender.mobile}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card-body">
                        <div>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(72, 135, 248)",
                              fontSize: "20px",
                            }}
                          >
                            Parcel Size
                          </p>
                          <p>Width: {parcel.parcelSize.width}</p>
                          <p>Height: {parcel.parcelSize.height}</p>
                          <p>Depth: {parcel.parcelSize.depth}</p>
                          <p>Weight: {parcel.parcelSize.weight}</p>
                          <p
                            style={{
                              fontWeight: "bold",
                              color: "rgb(246, 65, 47)",
                              fontSize: "20px",
                            }}
                          >
                            Status: {parcel.status}
                          </p>
                          <button
                            onClick={() => handleUpdateStatus(parcel._id)}
                          >
                            Update Status
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
