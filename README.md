# Digi Yatra – Flight Booking with Face Verification

Digi Yatra is a mock flight booking web app that collects passenger information and simulates booking a flight. Its main feature is **face recognition**: each passenger's photo is captured during booking and later used at self check-in to verify them. The boarding pass then shows whether the passenger is verified. If the face does not match, or verification was not completed, the boarding pass shows **Not Verified**.

[![Live demo](https://img.shields.io/badge/demo-live-brightgreen?logo=github)](https://sharky412.github.io/DigiYatra/)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)
![face-api.js](https://img.shields.io/badge/face--api.js-0.22-orange)

**Live demo:** https://sharky412.github.io/DigiYatra/

## Features

- **Flight search**: choose origin, destination and date, then pick a flight from the results.
- **Passenger details**: enter details for two passengers and capture each one's photo with the webcam.
- **Seat selection**: pick seats on a seat map.
- **Self check-in with face verification**: a live webcam capture is compared with the stored photo using face-api.js (face detection, landmarks and descriptors, with a 0.6 distance threshold).
- **Boarding pass**: shows each passenger's verification status and can be downloaded as a PDF (jsPDF).
- Collapsible sidebar navigation between every step.

Booking data is kept in the browser's `sessionStorage`. There is no backend.

## Tech stack

- React 19 (Create React App / `react-scripts`)
- React Router 7
- Bootstrap 5
- [face-api.js](https://github.com/justadudewhohacks/face-api.js), with pre-trained models in `public/models`
- react-webcam
- jsPDF

## Getting started

```bash
git clone https://github.com/sharky412/DigiYatra.git
cd DigiYatra
npm install
npm start
```

Then open http://localhost:3000. You need a webcam, and the browser must be allowed to use it.

| Script           | Description                                        |
| ---------------- | -------------------------------------------------- |
| `npm start`      | Start the development server                       |
| `npm run build`  | Create a production build                          |
| `npm run deploy` | Build and publish to GitHub Pages (via `gh-pages`) |
| `npm test`       | Run tests                                          |

## Project structure

```
src/
├── pages/Home.js                  # Flight search
└── components/
    ├── FlightResults.js
    ├── PassengerDetails.js        # Passenger info + photo capture
    ├── SeatSelection.js
    ├── SelfCheckIn.js             # Face verification + PDF boarding pass
    ├── FaceRecognition.js
    └── BoardingPass.js
```
