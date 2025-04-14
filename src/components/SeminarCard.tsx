
import React from 'react';
import { Link } from 'react-router-dom';
import { Seminar } from '../types';

interface SeminarCardProps {
  seminar: Seminar;
  showEditButton?: boolean;
  onDeleteClick?: (id: string) => void;
}

const SeminarCard: React.FC<SeminarCardProps> = ({ 
  seminar, 
  showEditButton = false,
  onDeleteClick
}) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            {seminar.topics.map((topic) => (
              <span key={topic} className="topic-tag">{topic}</span>
            ))}
          </div>
          
          {showEditButton && onDeleteClick && (
            <div className="d-flex">
              <Link to={`/seminars/${seminar.id}/edit`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDeleteClick(seminar.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        
        <h4 className="card-title">
          <Link to={`/seminars/${seminar.id}`} className="text-decoration-none text-dark">{seminar.title}</Link>
        </h4>
        
        <p className="text-muted mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001-.002-.246-.73-.993C11.824 10.354 10.144 9 8 9c-2.144 0-3.824 1.354-4.274 2.003C3.002 11.75 3 11.995 3 11.996v.008h12v-.008z"/>
          </svg>
          {seminar.presenter}, {seminar.organization}
        </p>
        
        <p className="card-text mb-3">{seminar.description}</p>
        
        <div className="d-flex flex-column mt-auto">
          <div className="d-flex align-items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-primary me-2">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            {seminar.date} ({seminar.timeFrame})
          </div>
          
          <div className="d-flex align-items-center mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-primary me-2">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            {seminar.time}
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-primary me-2">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            </svg>
            {seminar.location}
          </div>
          
          <Link to={`/seminars/${seminar.id}`} className="btn btn-sm btn-outline-primary mt-1">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
