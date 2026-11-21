import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BoardingPass = () => {
  const [passenger1, setPassenger1] = useState({});
  const [passenger2, setPassenger2] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showBoardingPass1, setShowBoardingPass1] = useState(false);
  const [showBoardingPass2, setShowBoardingPass2] = useState(false);
  const [isVerified1, setIsVerified1] = useState(false);
  const [isVerified2, setIsVerified2] = useState(false);
  const [flightDetails, setFlightDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const from = sessionStorage.getItem("flightFrom");
    const to = sessionStorage.getItem("flightTo");
    const date = sessionStorage.getItem("flightDate");

    if (from && to && date) {
      setFlightDetails({ from, to, date });
    }

    const storedPassenger1 = JSON.parse(sessionStorage.getItem("passenger1")) || {};
    const storedPassenger2 = JSON.parse(sessionStorage.getItem("passenger2")) || {};
    const storedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];

    setPassenger1(storedPassenger1);
    setPassenger2(storedPassenger2);
    setSelectedSeats(storedSeats);

    setIsVerified1(sessionStorage.getItem("isVerified1") === "true");
    setIsVerified2(sessionStorage.getItem("isVerified2") === "true");
  }, []);

  const generateBoardingPass = (passenger, seat, isVerified) => (
    <div className="card shadow-sm mb-4">
      <div className="card-body text-center">
        <h5 className="card-title text-primary">Boarding Pass</h5>
        <p className="card-text"><strong>Flight:</strong> Flight Number ABC123</p>
        <p className="card-text"><strong>Name:</strong> {passenger.name}</p>
        <p className="card-text"><strong>Seat:</strong> {seat}</p>
        <p className="card-text"><strong>Departure:</strong> {flightDetails.from}</p>
        <p className="card-text"><strong>Arrival:</strong> {flightDetails.to}</p>
        <p className="card-text"><strong>Flight Date:</strong> {flightDetails.date}</p>
        <p className="card-text"><strong>Gate:</strong> 10B</p>
        <p className="card-text"><strong>Boarding Time:</strong> 2:00 PM</p>
        <p className="card-text"><strong>Flight Time:</strong> 5:00 PM</p>
        {isVerified && (
          <div
            className="position-absolute top-50 start-50 translate-middle text-success fw-bold"
            style={{ fontSize: "2rem", opacity: 0.5 }}
          >
            APPROVED
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h1 className="text-center text-primary mb-4">Boarding Passes</h1>

      {/* Passenger 1 Boarding Pass */}
      <div className="mb-3">
        <button
          onClick={() => setShowBoardingPass1(!showBoardingPass1)}
          className="btn btn-outline-primary w-100"
        >
          {showBoardingPass1
            ? "Hide Boarding Pass for Passenger 1"
            : "View Boarding Pass for Passenger 1"}
        </button>
        {showBoardingPass1 && generateBoardingPass(passenger1, selectedSeats[0], isVerified1)}
      </div>

      {/* Passenger 2 Boarding Pass */}
      <div className="mb-3">
        <button
          onClick={() => setShowBoardingPass2(!showBoardingPass2)}
          className="btn btn-outline-primary w-100"
        >
          {showBoardingPass2
            ? "Hide Boarding Pass for Passenger 2"
            : "View Boarding Pass for Passenger 2"}
        </button>
        {showBoardingPass2 && generateBoardingPass(passenger2, selectedSeats[1], isVerified2)}
      </div>

      {/* Add Check-in Button */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate("/self-check-in")}
          className="btn btn-success btn-lg"
        >
          Check-in
        </button>
      </div>
    </div>
  );
};

export default BoardingPass;
