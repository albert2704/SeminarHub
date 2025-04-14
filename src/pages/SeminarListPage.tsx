
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SeminarCard from '../components/SeminarCard';
import { seminars } from '../data/seminars';
import { Seminar } from '../types';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Find Seminars</h1>
      
      <form onSubmit={handleSearch} className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search seminars by title, presenter, or keyword..."
              className="pl-10 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-52">
            <select
              className="w-full h-10 px-3 py-2 text-base rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">Topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-52">
            <select
              className="w-full h-10 px-3 py-2 text-base rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Search
          </Button>
        </div>
      </form>
      
      {filteredSeminars.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No seminars found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeminars.map((seminar) => (
            <SeminarCard key={seminar.id} seminar={seminar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeminarListPage;
