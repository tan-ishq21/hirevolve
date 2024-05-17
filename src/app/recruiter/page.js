"use client";
// src/pages/recruiters/index.js
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RecruiterSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('candidate')
      .select('*')
      .ilike('name', `%${searchTerm}%`);

    if (error) {
      console.error(error);
    } else {
      setResumes(data);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
          Search Candidates
        </label>
        <Input
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter candidate name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <Button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {resumes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          <ul>
            {resumes.map((resume) => (
              <li key={resume.id} className="mb-2">
                <p><strong>Name:</strong> {resume.name}</p>
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Education:</strong> {resume.education}</p>
                <p><strong>Experience:</strong> {resume.experience}</p>
                {resume.resume_url && (
                  <a href={resume.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Resume
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
