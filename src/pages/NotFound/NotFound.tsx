import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IslamicPattern } from '../../components/IslamicPattern/IslamicPattern';
import { BookOpen, Search, Home as HomeIcon } from 'lucide-react';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="not-found-page">
      <IslamicPattern opacity={0.08} />
      <div className="container">
        <div className="not-found-card">
          <div className="not-found-code font-cinzel gold-text">404</div>
          <div className="not-found-arabic font-arabic">الصفحة غير موجودة في المكتبة</div>
          <h1 className="not-found-title">Page Not Found in the Library Archive</h1>
          <p className="not-found-desc">
            The page or manuscript path you requested could not be located in our digital archives.
          </p>

          <form className="not-found-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search publications or authors..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="not-found-search-input"
            />
            <button type="submit" className="btn-gold">
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>

          <div className="not-found-actions">
            <Link to="/" className="btn-gold">
              <HomeIcon size={18} />
              <span>Return to Home Page</span>
            </Link>
            <Link to="/books" className="btn-outline-gold">
              <BookOpen size={18} />
              <span>Explore Books Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
