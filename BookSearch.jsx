// BookSearch.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookSearch.css';
const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`
        );
        setSearchResults(response.data.docs);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchBooks();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToBookshelf = (book) => {
    // Implement logic to add book to localStorage here
    const currentBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    currentBookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(currentBookshelf));
  };

  return (
    <div className="book-search">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching books: {error.message}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((book) => (
            <li key={book.key}>
                 <div className="book-item">
                <div className="book-info">
              <p className="book-title">{book.title}</p>
              <p className="book-authors">
                {book.author_name && book.author_name.join(', ')}
              </p>
              </div>
              <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {searchResults.length === 0 && searchTerm && <p>No results found.</p>}
    </div>
  );
};

export default BookSearch;
