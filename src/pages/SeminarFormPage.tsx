
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { seminars } from '../data/seminars';

const SeminarFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const existingSeminar = isEditing 
    ? seminars.find(s => s.id === id) 
    : undefined;
  
  const [title, setTitle] = useState(existingSeminar?.title || '');
  const [description, setDescription] = useState(existingSeminar?.description || '');
  const [presenter, setPresenter] = useState(existingSeminar?.presenter || '');
  const [organization, setOrganization] = useState(existingSeminar?.organization || '');
  const [date, setDate] = useState(existingSeminar?.date || '');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState(existingSeminar?.location || '');
  const [topics, setTopics] = useState<string[]>(existingSeminar?.topics || []);
  
  const allTopics = [
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 
    'Mathematics', 'Medicine', 'Environmental Science', 'Psychology',
    'Neuroscience', 'Astronomy', 'Ethics', 'Energy', 'Climatology'
  ];
  
  const handleTopicToggle = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter(t => t !== topic));
    } else {
      setTopics([...topics, topic]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    console.log({
      title,
      description,
      presenter,
      organization,
      date,
      time: `${startTime} - ${endTime}`,
      location,
      topics
    });
    
    // Redirect to the moderator dashboard
    navigate('/moderator');
  };
  
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <Link to="/moderator" className="btn btn-link text-decoration-none px-0 me-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Back to Dashboard
            </Link>
          </div>
          
          <div className="card">
            <div className="card-body p-4">
              <h1 className="card-title mb-4">{isEditing ? 'Edit Seminar' : 'Create New Seminar'}</h1>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Seminar Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="presenter" className="form-label">Presenter Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="presenter"
                      value={presenter}
                      onChange={(e) => setPresenter(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="organization" className="form-label">Organization*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description*</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="date" className="form-label">Date*</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="startTime" className="form-label">Start Time*</label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="endTime" className="form-label">End Time*</label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Topics*</label>
                  <div className="d-flex flex-wrap gap-2">
                    {allTopics.map((topic) => (
                      <div key={topic} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`topic-${topic}`}
                          checked={topics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                        />
                        <label className="form-check-label" htmlFor={`topic-${topic}`}>
                          {topic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="d-flex justify-content-end gap-2">
                  <Link to="/moderator" className="btn btn-outline-secondary">Cancel</Link>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Seminar' : 'Create Seminar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarFormPage;
