"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-pink-300">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-8 flex items-center justify-center">Welcome to RecruitHive</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate Card */}
          <div className="border border-gray-200 rounded-lg p-4 bg-rose-100">
            <h2 className="text-xl font-bold mb-2">Are you a Candidate?</h2>
            <p className="text-gray-700 mb-4">Click below to access the Candidate Page</p>
            <Link href="/candidate">
              <Button >Candidate Page</Button>
            </Link>
          </div>
          {/* Recruiter Card */}
          <div className="border border-gray-200 rounded-lg p-4 bg-rose-100">
            <h2 className="text-xl font-bold mb-2">Are you a Recruiter?</h2>
            <p className="text-gray-700 mb-4">Click below to access the Recruiter Page</p>
            <Link href="/recruiter">
              <Button >Recruiter Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
