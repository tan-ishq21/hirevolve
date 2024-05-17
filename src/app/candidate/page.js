"use client";
import { useState,  useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from '../navbar/page';

export default function CandidateProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    education: '',
    experience: '',
    linkedin: ''
  });
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const resetForm = () => {
    setProfile({
      name: '',
      email: '',
      education: '',
      experience: '',
      linkedin: ''
    });
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let resumeUrl = null;
    if (resume) {
      const fileExt = resume.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath , resume );

      if (uploadError) {
        console.error(uploadError);
        setUploading(false);
        return;
      }

      const { data: { publicUrl }, error: urlError } = supabase.storage
      .from('resumes')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error(urlError);
      setUploading(false);
      return;
    }

      resumeUrl = publicUrl;
    }

    const { error: insertError } = await supabase
      .from('candidate')
      .insert([{ ...profile, resume_url: resumeUrl }]);

    if (insertError) {
      console.error(insertError);
    } else {
      alert('Profile saved successfully!');
      resetForm();
    }

    setUploading(false);
  };

  return (
    <>
    <Navbar />

    <div className="container mx-auto p-4 mt-4">
      <h1 className='text-2xl font-semibold mb-3'> Candidate Details</h1>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            type="text"
            className='focus:bg-rose-100'
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            type="email"
            className='focus:bg-rose-100'
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="education">
            Education
          </label>
          <Input
            name="education"
            value={profile.education}
            onChange={handleChange}
            type="text"
            className='focus:bg-rose-100'
            placeholder="Enter your education"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="experience">
            Experience
          </label>
          <Input
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            type="text"
            className='focus:bg-rose-100'
            placeholder="Enter your experience (in years)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="projects">
            Linkedin URL
          </label>
          <Input
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            type="text"
            className='focus:bg-rose-100'
            placeholder="Enter your Linkedin URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-semibold mb-2" htmlFor="resume">
            Resume (PDF)
          </label>
          <Input
            type="file"
            onChange={handleResumeChange}
            accept="application/pdf"
            className='hover:cursor-pointer'
            ref={fileInputRef}
          />
        </div>
        <Button
          type="submit"
          disabled={uploading}
        >
          {uploading ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
    </>
  );
}
