
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { seminars } from '../data/seminars';
import SeminarCard from '../components/SeminarCard';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '../components/ui/button';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();
  const featuredSeminars = seminars.slice(0, 3);
  
  // Get unique list of topics and locations for filters
  const topics = Array.from(new Set(seminars.flatMap(s => s.topics)));
  const locations = Array.from(new Set(seminars.map(s => s.location.split(',')[0].trim())));
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL search params
    const params: { [key: string]: string } = {};
    if (searchQuery) params.query = searchQuery;
    if (selectedTopic) params.topic = selectedTopic;
    if (selectedLocation) params.location = selectedLocation;
    
    navigate({ 
      pathname: '/seminars',
      search: new URLSearchParams(params).toString()
    });
  };
  
  return (
    <>
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-4">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 px-4 py-2 text-sm rounded-full">
              Scientific Community
            </Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6">Discover Scientific Seminars</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Join the global scientific community. Discover, attend, and contribute to
            research seminars around the world.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Link 
              to="/seminars" 
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>
              </svg>
              Upcoming Seminars
            </Link>
            <Link 
              to="/submit" 
              className="inline-flex items-center bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 font-medium py-3 px-6 rounded-md"
            >
              Submit a Seminar
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/seminars?topic=Physics" className="text-gray-700 hover:text-purple-600 font-medium px-3">Physics</Link>
            <Link to="/seminars?topic=Chemistry" className="text-gray-700 hover:text-purple-600 font-medium px-3">Chemistry</Link>
            <Link to="/seminars?topic=Biology" className="text-gray-700 hover:text-purple-600 font-medium px-3">Biology</Link>
            <Link to="/seminars?topic=Computer Science" className="text-gray-700 hover:text-purple-600 font-medium px-3">Computer Science</Link>
            <Link to="/seminars?topic=Mathematics" className="text-gray-700 hover:text-purple-600 font-medium px-3">Mathematics</Link>
            <Link to="/seminars?topic=Medicine" className="text-gray-700 hover:text-purple-600 font-medium px-3">Medicine</Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Seminars</h2>
          
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto mb-16">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSeminars.map((seminar) => (
              <SeminarCard key={seminar.id} seminar={seminar} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
