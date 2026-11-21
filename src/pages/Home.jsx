import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      alert("Please fill in all fields");
      return;
    }

    sessionStorage.setItem("flightFrom", from);
    sessionStorage.setItem("flightTo", to);
    sessionStorage.setItem("flightDate", date);

    navigate(`/results?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4 text-primary">Flight Booking</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">From</label>
                  <select
                    className="form-select"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    required
                  >
                    <option value="">Select Airport</option>
                    <option value="DEL">Indira Gandhi International (DEL)</option>
                    <option value="BOM">Chhatrapati Shivaji Maharaj (BOM)</option>
                    <option value="BLR">Kempegowda International (BLR)</option>
                    <option value="CCU">Netaji Subhash Chandra Bose (CCU)</option>
                    <option value="MAA">Chennai International (MAA)</option>
                    <option value="HYD">Rajiv Gandhi International (HYD)</option>
                    <option value="COK">Cochin International (COK)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">To</label>
                  <select
                    className="form-select"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                  >
                    <option value="">Select Airport</option>
                    <option value="DEL">Indira Gandhi International (DEL)</option>
                    <option value="BOM">Chhatrapati Shivaji Maharaj (BOM)</option>
                    <option value="BLR">Kempegowda International (BLR)</option>
                    <option value="CCU">Netaji Subhash Chandra Bose (CCU)</option>
                    <option value="MAA">Chennai International (MAA)</option>
                    <option value="HYD">Rajiv Gandhi International (HYD)</option>
                    <option value="COK">Cochin International (COK)</option>
                    <option value="PNQ">Pune International (PNQ)</option>
                    <option value="GOI">Goa International (GOI)</option>
                    <option value="IXC">Chandigarh International (IXC)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Date of Travel</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Search Flights
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
