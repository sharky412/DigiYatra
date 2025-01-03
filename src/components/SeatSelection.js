import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SeatSelection = () => {
  const navigate = useNavigate();

  // Example: Airplane seating layout
  const rows = 5;
  const seatsPerRow = ["A", "B", "C", "D"]; // A, B on the left; C, D on the right

  // State to manage the selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Load selected seats from sessionStorage on initial render
  useEffect(() => {
    const storedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];
    setSelectedSeats(storedSeats);
  }, []);

  // Handle seat click
  const handleSeatClick = (row, col) => {
    const seat = `${row}${col}`;
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((s) => s !== seat); // Deselect if already selected
      } else {
        return [...prevSelectedSeats, seat]; // Add to selected seats
      }
    });
  };

  // After seat selection
  const handleSubmit = () => {
    // Save selected seats to sessionStorage
    sessionStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));

    // Redirect to boarding pass page
    navigate("/boarding-pass");
  };

  return (
    <div className="container my-4">
      <h1 className="text-center text-primary mb-4">Select Your Seats</h1>

      <div className="d-flex flex-column align-items-center">
        <div className="border border-dark rounded bg-light p-3 mb-4" style={{ maxWidth: "400px" }}>
          <h5 className="text-center text-secondary">Aircraft Seating</h5>

          {Array.from({ length: rows }, (_, rowIndex) => (
            <div className="d-flex justify-content-between align-items-center my-2" key={rowIndex}>
              {/* Left side seats */}
              <div className="d-flex gap-2">
                {["A", "B"].map((col) => {
                  const seat = `${rowIndex + 1}${col}`;
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <div
                      key={col}
                      onClick={() => handleSeatClick(rowIndex + 1, col)}
                      className={`seat ${isSelected ? "bg-success text-white" : "bg-light"}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>

              {/* Spacer to mimic aisle */}
              <div style={{ width: "20px" }}></div>

              {/* Right side seats */}
              <div className="d-flex gap-2">
                {["C", "D"].map((col) => {
                  const seat = `${rowIndex + 1}${col}`;
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <div
                      key={col}
                      onClick={() => handleSeatClick(rowIndex + 1, col)}
                      className={`seat ${isSelected ? "bg-success text-white" : "bg-light"}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {col}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-success" onClick={handleSubmit}>
          Confirm Selection
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
