import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
  const webcamRef = useRef(null); // Reference for the webcam
  const [isVerified, setIsVerified] = useState(false); // Verification status
  const [loading, setLoading] = useState(true); // Loading state for models

  // Load models from a local folder or CDN
  useEffect(() => {
    const loadModels = async () => {
      // Path to the models directory or CDN
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); // Object detection model
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models'); // Face recognition model
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models'); // Landmark detection model
      setLoading(false); // Set loading to false after models are loaded
    };

    loadModels(); // Call the function to load models
  }, []);

  // Capture an image from the webcam
  const captureImage = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture the image
      const img = await faceapi.bufferToImage(imageSrc); // Convert to image format
      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor(); // Detect face

      if (detections) {
        const faceMatcher = new faceapi.FaceMatcher(detections, 0.6); // 0.6 is the threshold
        // Compare the detected face with a stored face descriptor
        const bestMatch = faceMatcher.findBestMatch(detections.descriptor);

        if (bestMatch.label === 'known') {
          setIsVerified(true); // Face verified successfully
        } else {
          setIsVerified(false); // Face mismatch
        }
      } else {
        alert('No face detected. Please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Face Verification</h1>
      {loading ? (
        <p>Loading models...</p>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'user',
            }}
            width="100%"
          />
          <button onClick={captureImage} style={buttonStyle}>Capture and Verify</button>
          {isVerified && <p>Face verified successfully!</p>}
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  marginTop: '20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

export default FaceRecognition;
