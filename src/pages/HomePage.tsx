
import React from 'react';
import { Link } from 'react-router-dom';
import { seminars } from '../data/seminars';
import SeminarCard from '../components/SeminarCard';

const HomePage: React.FC = () => {
  const featuredSeminars = seminars.slice(0, 3);
  
  return (
    <>
      <section className="py-5 text-center bg-light">
        <div className="container">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-normal px-3 py-2 mb-3">Scientific Community</span>
          <h1 className="display-3 fw-bold mb-3">Discover Scientific Seminars</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Join the global scientific community. Discover, attend, and contribute to
            research seminars around the world.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Link to="/seminars" className="btn btn-primary px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
              </svg>
              Upcoming Seminars
            </Link>
            <Link to="/submit" className="btn btn-outline-primary px-4 py-2">Submit a Seminar</Link>
          </div>
          
          <div className="d-flex justify-content-center flex-wrap mt-4">
            <Link to="/seminars?topic=Physics" className="btn btn-link text-decoration-none fw-medium">Physics</Link>
            <Link to="/seminars?topic=Chemistry" className="btn btn-link text-decoration-none fw-medium">Chemistry</Link>
            <Link to="/seminars?topic=Biology" className="btn btn-link text-decoration-none fw-medium">Biology</Link>
            <Link to="/seminars?topic=Computer Science" className="btn btn-link text-decoration-none fw-medium">Computer Science</Link>
            <Link to="/seminars?topic=Mathematics" className="btn btn-link text-decoration-none fw-medium">Mathematics</Link>
            <Link to="/seminars?topic=Medicine" className="btn btn-link text-decoration-none fw-medium">Medicine</Link>
          </div>
        </div>
      </section>
      
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Featured Seminars</h2>
          <div className="row g-4">
            {featuredSeminars.map((seminar) => (
              <div key={seminar.id} className="col-md-6 col-lg-4">
                <SeminarCard seminar={seminar} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/seminars" className="btn btn-outline-primary">View All Seminars</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
