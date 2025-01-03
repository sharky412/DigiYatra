import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";

const SelfCheckIn = () => {
  const webcamRef = useRef(null);
  const [imageSrc1, setImageSrc1] = useState(null);
  const [imageSrc2, setImageSrc2] = useState(null);
  const [isVerified1, setIsVerified1] = useState(false);
  const [isVerified2, setIsVerified2] = useState(false);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const baseUrl = process.env.PUBLIC_URL || ".";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(`${baseUrl}/models`);
        await faceapi.nets.faceLandmark68Net.loadFromUri(`${baseUrl}/models`);
        await faceapi.nets.faceRecognitionNet.loadFromUri(`${baseUrl}/models`);
        setIsModelsLoaded(true);
      } catch (err) {
        console.error("Error loading face-api models:", err);
      }
    };

    loadModels();
  }, []);

  const captureImage = (setImageSrc, passengerIndex) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sessionStorage.setItem(`capturedFace${passengerIndex}`, imageSrc);
  };

  const handleVerifyFace = async (
    passengerIndex,
    imageSrc,
    setIsVerified
  ) => {
    if (!isModelsLoaded) {
      alert("Models are still loading. Please wait...");
      return;
    }

    const passengerData = JSON.parse(
      sessionStorage.getItem(`passenger${passengerIndex}`)
    );

    if (imageSrc) {
      const img1 = await faceapi.fetchImage(imageSrc);
      const detections1 = await faceapi
        .detectSingleFace(img1)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections1) {
        const storedFaceImage = passengerData ? passengerData.image : null;
        if (storedFaceImage) {
          const img2 = await faceapi.fetchImage(storedFaceImage);
          const detections2 = await faceapi
            .detectSingleFace(img2)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detections2) {
            const distance = faceapi.euclideanDistance(
              detections1.descriptor,
              detections2.descriptor
            );
            if (distance < 0.6) {
              setIsVerified(true);
              sessionStorage.setItem(`isVerified${passengerIndex}`, "true");
            } else {
              alert("Face mismatch! Please try again.");
            }
          } else {
            alert(
              `No face detected in the stored image for passenger ${passengerIndex}!`
            );
          }
        } else {
          alert(`Stored face image not found for passenger ${passengerIndex}!`);
        }
      } else {
        alert("No face detected in the captured image!");
      }
    }
  };

  const generateBoardingPassPDF = (passengerNumber) => {
    const doc = new jsPDF("landscape");
  
    const flightDetails = JSON.parse(sessionStorage.getItem("selectedFlight"));
    const passengerData = JSON.parse(
      sessionStorage.getItem(`passenger${passengerNumber}`)
    );
  
    if (!passengerData) {
      alert(`Passenger ${passengerNumber} data not found in sessionStorage!`);
      return;
    }
  
    const details = {
      flightNumber: flightDetails.flightNumber,
      flightFrom: flightDetails.from,
      flightTo: flightDetails.to,
      flightDate: flightDetails.date,
      price: flightDetails.price,
      name: passengerData.name,
      image: passengerData.image,
      seat: getSeatAssignment(passengerNumber),
      isVerified: sessionStorage.getItem(`isVerified${passengerNumber}`) === "true",
    };
  
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(3);
    doc.rect(10, 10, 280, 180);
  
    doc.setFillColor(240, 240, 240);
    doc.rect(12, 12, 276, 176, "F");
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Boarding Pass", 140, 30, null, null, "center");
  
    doc.setFontSize(14);
    doc.text(`Flight Number: ${details.flightNumber}`, 20, 50);
    doc.text(`Name: ${details.name}`, 20, 60);
    doc.text(`From: ${details.flightFrom}`, 20, 70);
    doc.text(`To: ${details.flightTo}`, 20, 80);
    doc.text(`Date: ${details.flightDate}`, 20, 90);
    doc.text(`Price: ${details.price}`, 20, 100);
  
    doc.text(`Seat: ${details.seat}`, 150, 50);
    doc.text(`Boarding Zone: 1`, 150, 60);
    doc.text(`Gate: A21`, 150, 70);
    doc.text(`Boarding Time: 1500 Hrs`, 150, 80);
    doc.text(`Departure: 1555 Hrs`, 150, 90);
  
    // Conditional text for verification
    if (details.isVerified) {
      doc.setFontSize(70);
      doc.setTextColor(0, 255, 0, 50);
      doc.text("APPROVED", 140, 140, null, null, "center");
    } else {
      doc.setFontSize(20);
      doc.setTextColor(255, 0, 0);
      doc.text("NOT VERIFIED", 140, 140, null, null, "center");
    }
  
    doc.save(`${details.name}_boarding_pass.pdf`);
  };
  

  const getSeatAssignment = (passengerNumber) => {
    const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats")) || [];
    return selectedSeats[passengerNumber - 1] || "Unknown Seat";
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Self Check-in</h1>

      {!isModelsLoaded && (
        <div className="alert alert-info text-center">Loading models...</div>
      )}

      {isModelsLoaded && (
        <div className="text-center mb-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border rounded"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <h3 className="text-secondary">Passenger 1</h3>
          <button
            className="btn btn-primary btn-block mb-2"
            onClick={() => captureImage(setImageSrc1, 1)}
          >
            Capture Face
          </button>
          {imageSrc1 && (
            <img src={imageSrc1} alt="Captured" className="img-fluid mb-2" />
          )}
          <button
            className="btn btn-success btn-block"
            onClick={() => handleVerifyFace(1, imageSrc1, setIsVerified1)}
          >
            Verify Face
          </button>
          {isVerified1 && (
            <div className="alert alert-success mt-2">
              Passenger 1 Verification Successful!
            </div>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-secondary">Passenger 2</h3>
          <button
            className="btn btn-primary btn-block mb-2"
            onClick={() => captureImage(setImageSrc2, 2)}
          >
            Capture Face
          </button>
          {imageSrc2 && (
            <img src={imageSrc2} alt="Captured" className="img-fluid mb-2" />
          )}
          <button
            className="btn btn-success btn-block"
            onClick={() => handleVerifyFace(2, imageSrc2, setIsVerified2)}
          >
            Verify Face
          </button>
          {isVerified2 && (
            <div className="alert alert-success mt-2">
              Passenger 2 Verification Successful!
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 text-center">
        <h2 className="text-primary">Generate Boarding Pass</h2>
        <button
          className="btn btn-info btn-lg mx-2"
          onClick={() => generateBoardingPassPDF(1)}
        >
          Passenger 1
        </button>
        <button
          className="btn btn-info btn-lg mx-2"
          onClick={() => generateBoardingPassPDF(2)}
        >
          Passenger 2
        </button>
      </div>
    </div>
  );
};

export default SelfCheckIn;
