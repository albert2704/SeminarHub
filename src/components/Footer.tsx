
import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-top py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0 text-muted">© {year} SeminarHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
