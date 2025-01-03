import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FlightResults from './components/FlightResults';
import PassengerDetails from './components/PassengerDetails';
import SeatSelection from './components/SeatSelection';
import BoardingPass from './components/BoardingPass';
import SelfCheckIn from './components/SelfCheckIn';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className={`bg-dark text-white p-3 ${sidebarCollapsed ? 'collapsed-sidebar' : ''}`}
          style={{
            minWidth: sidebarCollapsed ? '60px' : '250px',
            transition: 'all 0.3s ease-in-out',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <button
            className="btn btn-light btn-sm mb-3"
            onClick={toggleSidebar}
            style={{
              width: '100%',
            }}
          >
            {sidebarCollapsed ? '▶' : '◀ Collapse Sidebar'}
          </button>
          {!sidebarCollapsed && (
            <nav className="d-flex flex-column">
              <Link to="/" className="text-white text-decoration-none mb-2">Home</Link>
              <Link to="/results" className="text-white text-decoration-none mb-2">Flight Results</Link>
              <Link to="/passenger-details" className="text-white text-decoration-none mb-2">Passenger Details</Link>
              <Link to="/select-seats" className="text-white text-decoration-none mb-2">Seat Selection</Link>
              <Link to="/boarding-pass" className="text-white text-decoration-none mb-2">Boarding Pass</Link>
              <Link to="/self-check-in" className="text-white text-decoration-none mb-2">Self Check-In</Link>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <div
          style={{
            flexGrow: 1,
            backgroundImage: `url(${process.env.PUBLIC_URL + '/airplane.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<FlightResults />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/select-seats" element={<SeatSelection />} />
            <Route path="/boarding-pass" element={<BoardingPass />} />
            <Route path="/self-check-in" element={<SelfCheckIn />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
