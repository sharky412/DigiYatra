import React, { useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function PassengerDetails() {
  const [passenger1Name, setPassenger1Name] = useState("");
  const [passenger2Name, setPassenger2Name] = useState("");
  const [capturedImage1, setCapturedImage1] = useState(null);
  const [capturedImage2, setCapturedImage2] = useState(null);
  const navigate = useNavigate();

  const webcam1Ref = React.useRef(null);
  const webcam2Ref = React.useRef(null);

  const handleCaptureImage1 = () => {
    const imageSrc = webcam1Ref.current.getScreenshot();
    if (imageSrc) setCapturedImage1(imageSrc);
  };

  const handleCaptureImage2 = () => {
    const imageSrc = webcam2Ref.current.getScreenshot();
    if (imageSrc) setCapturedImage2(imageSrc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem(
      "passenger1",
      JSON.stringify({ name: passenger1Name, image: capturedImage1 })
    );
    sessionStorage.setItem(
      "passenger2",
      JSON.stringify({ name: passenger2Name, image: capturedImage2 })
    );

    alert("Passenger details saved");
    navigate("/select-seats");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Passenger Details</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label">Passenger 1 Name:</label>
          <input
            type="text"
            className="form-control"
            value={passenger1Name}
            onChange={(e) => setPassenger1Name(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Passenger 2 Name:</label>
          <input
            type="text"
            className="form-control"
            value={passenger2Name}
            onChange={(e) => setPassenger2Name(e.target.value)} 
            required
          />
        </div>

        <h3 className="text-secondary">Passenger 1 Face</h3>
        <Webcam
          ref={webcam1Ref}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="border mb-3"
          style={{ width: "80%", height: "500px", objectFit: "cover", marginLeft: "10%" }} // Increased height
        />
        <br></br>
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleCaptureImage1} style={{marginLeft: "45%"}}
        >
          Capture Face
        </button>
        {capturedImage1 && (
          <img
            src={capturedImage1}
            alt="Passenger 1 Face"
            className="img-thumbnail"
            style={{ maxWidth: "200px" }}
          />
        )}

        <h3 className="text-secondary mt-4">Passenger 2 Face</h3>
        <Webcam
          ref={webcam2Ref}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="border mb-3"
          style={{ width: "80%", height: "500px", objectFit: "cover", marginLeft: "10%" }} // Increased height
        />
        <br></br>
        <button
          type="button"
          className="btn btn-success mb-3"
          onClick={handleCaptureImage2} style={{marginLeft: "45%"}}
        >
          Capture Face
        </button>
        {capturedImage2 && (
          <img
            src={capturedImage2}
            alt="Passenger 2 Face"
            className="img-thumbnail"
            style={{ maxWidth: "200px" }}
          />
        )}

        <button type="submit" className="btn btn-primary w-100">
          Submit Details
        </button>
      </form>
    </div>
  );
}

export default PassengerDetails;
