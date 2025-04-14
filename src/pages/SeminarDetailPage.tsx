
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { seminars } from '../data/seminars';

const SeminarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const seminar = seminars.find(s => s.id === id);
  
  if (!seminar) {
    return (
      <div className="container py-5 text-center">
        <h2>Seminar not found</h2>
        <p>The seminar you're looking for doesn't exist or has been removed.</p>
        <Link to="/seminars" className="btn btn-primary mt-3">Back to seminars</Link>
      </div>
    );
  }
  
  return (
    <div className="container py-4">
      <Link to="/seminars" className="d-inline-flex align-items-center text-decoration-none mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
        Back to seminars
      </Link>
      
      <div className="d-flex flex-wrap gap-2 mb-2">
        {seminar.topics.map(topic => (
          <span key={topic} className="topic-tag">{topic}</span>
        ))}
      </div>
      
      <h1 className="mb-1">{seminar.title}</h1>
      
      <p className="text-muted mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001-.002-.246-.73-.993C11.824 10.354 10.144 9 8 9c-2.144 0-3.824 1.354-4.274 2.003C3.002 11.75 3 11.995 3 11.996v.008h12v-.008z"/>
        </svg>
        {seminar.presenter}, {seminar.organization}
      </p>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="text-center bg-light rounded py-5 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#6c757d" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                </svg>
              </div>
              
              <ul className="nav nav-tabs mb-4" id="seminarTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link active" 
                    id="description-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#description" 
                    type="button" 
                    role="tab" 
                    aria-controls="description" 
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button 
                    className="nav-link" 
                    id="agenda-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#agenda" 
                    type="button" 
                    role="tab" 
                    aria-controls="agenda" 
                    aria-selected="false"
                  >
                    Agenda
                  </button>
                </li>
              </ul>
              
              <div className="tab-content" id="seminarTabsContent">
                <div className="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                  <p className="mb-4">{seminar.description}</p>
                  
                  <p className="mb-0">
                    The presentation will cover current regulatory frameworks, concerns about genetic enhancement versus
                    treatment, and issues of access and equity. Attendees will have the opportunity to participate in a moderated
                    discussion about how society should approach these powerful new capabilities.
                  </p>
                </div>
                
                <div className="tab-pane fade" id="agenda" role="tabpanel" aria-labelledby="agenda-tab">
                  {seminar.agenda ? (
                    <ul className="list-unstyled">
                      {seminar.agenda.map((item, index) => (
                        <li key={index} className="agenda-item pb-3">
                          <span className="agenda-time">{item.time}</span>
                          <span>{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No agenda available for this seminar.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Seminar Details</h5>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-muted small">Date</div>
                  <div>{seminar.date}</div>
                  <div className="small text-muted">{seminar.timeFrame}</div>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-muted small">Time</div>
                  <div>{seminar.time}</div>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-4">
                <div className="me-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-muted small">Location</div>
                  <div>{seminar.location}</div>
                </div>
              </div>
              
              <div className="text-center mb-3">
                <p className="text-muted small mb-3">Sign in to register for this seminar</p>
                <Link to="/login" className="btn btn-primary w-100">Sign In</Link>
              </div>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Share this seminar</h5>
              <button className="btn btn-outline-secondary w-100">Copy Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarDetailPage;
