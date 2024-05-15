// components/Navbar.jsx

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">
          MyApp
        </div>
        <div className="flex space-x-4">
          <Link href="/candidate">
            <Button>Candidate's Page</Button>
          </Link>
          <Link href="/recruiter">
            <Button>Recruiter's Page</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
