
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SeminarCard from '../components/SeminarCard';
import { seminars } from '../data/seminars';

const ModeratorDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manage' | 'review'>('manage');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState<string | null>(null);
  
  const handleDeleteClick = (id: string) => {
    setSeminarToDelete(id);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = () => {
    // In a real app, this would call an API to delete the seminar
    console.log(`Deleting seminar with ID: ${seminarToDelete}`);
    setShowDeleteModal(false);
    setSeminarToDelete(null);
  };
  
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Moderator Dashboard</h1>
        <Link to="/seminars/new" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-1">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Add New Seminar
        </Link>
      </div>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Seminars
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            Review Submissions
          </button>
        </li>
      </ul>
      
      {activeTab === 'manage' && (
        <div className="row g-4">
          {seminars.map((seminar) => (
            <div key={seminar.id} className="col-md-6 col-lg-4">
              <SeminarCard
                seminar={seminar}
                showEditButton
                onDeleteClick={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'review' && (
        <div className="text-center py-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#6c757d" viewBox="0 0 16 16" className="mb-3">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <h3>No pending submissions</h3>
          <p className="text-muted">New seminar submissions will appear here for your review</p>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this seminar? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
};

export default ModeratorDashboardPage;
