
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SeminarCard from '../components/SeminarCard';
import { seminars } from '../data/seminars';
import { Seminar } from '../types';

const SeminarListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [selectedTopic, setSelectedTopic] = useState(searchParams.get('topic') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  
  // Get unique list of topics and locations for filters
  const topics = Array.from(new Set(seminars.flatMap(s => s.topics)));
  const locations = Array.from(new Set(seminars.map(s => s.location.split(',')[0].trim())));
  
  const filterSeminars = (seminars: Seminar[]) => {
    return seminars.filter(seminar => {
      // Search query filter
      const matchesQuery = searchQuery === '' || 
        seminar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seminar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seminar.presenter.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Topic filter
      const matchesTopic = selectedTopic === '' || 
        seminar.topics.some(t => t.toLowerCase() === selectedTopic.toLowerCase());
      
      // Location filter
      const matchesLocation = selectedLocation === '' || 
        seminar.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      return matchesQuery && matchesTopic && matchesLocation;
    });
  };
  
  const filteredSeminars = filterSeminars(seminars);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL search params
    const params: { [key: string]: string } = {};
    if (searchQuery) params.query = searchQuery;
    if (selectedTopic) params.topic = selectedTopic;
    if (selectedLocation) params.location = selectedLocation;
    
    setSearchParams(params);
  };
  
  return (
    <div className="container py-5">
      <h1 className="mb-4">Find Seminars</h1>
      
      <div className="card shadow-sm mb-5">
        <div className="card-body p-4">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search seminars by title, presenter, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="col-md-6 col-lg-2">
                <select
                  className="form-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option value="">Topic</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-6 col-lg-2">
                <select
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="col-md-12 col-lg-2">
                <button type="submit" className="btn btn-primary w-100">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {filteredSeminars.length === 0 ? (
        <div className="text-center py-5">
          <h3>No seminars found</h3>
          <p className="text-muted">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredSeminars.map((seminar) => (
            <div key={seminar.id} className="col-md-6 col-lg-4">
              <SeminarCard seminar={seminar} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeminarListPage;
