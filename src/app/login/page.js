"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        setError(error.message);
      } else {
        router.push('/recruiter');
      }
    };
   
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-pink-300">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">Sign in to your account</h2>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className='mt-4'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className='w-full'
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="mt-2 text-center">
            <button
              onClick={() => router.push('/signup')}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Dont have an account? Signup
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;