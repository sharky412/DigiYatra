import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function FlightResults() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const from = sessionStorage.getItem("flightFrom");
    const to = sessionStorage.getItem("flightTo");
    const date = sessionStorage.getItem("flightDate");

    if (!from || !to || !date) {
      setError("Please provide valid flight search parameters (from, to, and date).");
      return;
    }

    const flightData = [
      { id: 1, from, to, date, price: "$100", flightNumber: "AA123" },
      { id: 2, from, to, date, price: "$150", flightNumber: "UA456" },
      { id: 3, from, to, date, price: "$200", flightNumber: "DL789" },
      { id: 4, from, to, date, price: "$250", flightNumber: "SW321" },
      { id: 5, from, to, date, price: "$180", flightNumber: "BA654" },
      { id: 6, from, to, date, price: "$220", flightNumber: "QF987" },
    ];

    setFlights(flightData);
  }, []);

  const handleSelectFlight = (flight) => {
    sessionStorage.setItem("selectedFlight", JSON.stringify(flight));
    navigate("/passenger-details");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Flight Results</h1>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        {flights.map((flight) => (
          <div className="col-md-6 mb-4" key={flight.id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Flight Number: {flight.flightNumber}</h5>
                <p className="card-text">
                  <strong>Price:</strong> {flight.price}
                </p>
                <button
                  onClick={() => handleSelectFlight(flight)}
                  className="btn btn-primary w-100"
                >
                  Select Flight
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightResults;
