"use client";
// src/pages/recruiters/index.js
import { useState , useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import Navbar from '../navbar/page';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'next/navigation';
  

export default function RecruiterSearch() {

  const [setting, setSetting] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
      setSetting(false);
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    if (authenticated) {
      fetchAllCandidates();
    }
  }, [authenticated]);

  const fetchAllCandidates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('candidate')
      .select('*');

    if (error) {
      console.error(error);
    } else {
      setResumes(data);
    }
    setLoading(false);
  };

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

  if (setting) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-4 bg-gradient-to-r from-purple-300 to-pink-300">
      <div className="mb-4">
        <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="search">
          Search Candidates
        </label>
        <Input
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter candidate name"
        />
      </div>
      <Button
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {resumes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map((resume) => (
              <Card key={resume.id} className="shadow-md rounded-lg p-4 bg-rose-100 text-black">
                <CardContent>
                  <h1 className="text-lg m-2 mb-3">{resume.name}</h1>
                  <h2 className="text-sm m-2">Email: {resume.email}</h2>
                  <h2 className="text-sm m-2">Education: {resume.education}</h2>
                  <h2 className="text-sm m-2">Experience: {resume.experience}</h2>
                  <div className="justify-items-center items-center">
                    {resume.resume_url && (
                        <Button className="mt-2 justify-center items-center">
                        <a href={resume.resume_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                        </a>
                        </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}