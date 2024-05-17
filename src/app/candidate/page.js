"use client";
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
    }

    setUploading(false);
  };

  // const addUrlToTable = async (e) => {

  // }

  return (
    
    <div className="container mx-auto p-4">

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="name">
            Name
          </label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your name"
          />
         
          
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="email">
            Email
          </label>
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="education">
            Education
          </label>
          <Input
            name="education"
            value={profile.education}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your education"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="experience">
            Experience
          </label>
          <Input
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your experience"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="projects">
            linkedin url
          </label>
          <Input
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your projects"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="resume">
            Resume (PDF)
          </label>
          <Input
            type="file"
            onChange={handleResumeChange}
            className="block w-auto h-50 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 hover:cursor-pointer"
            accept="application/pdf"
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
  );
}
