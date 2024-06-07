// App.jsx
import React, { useState, useEffect } from 'react';
import BookSearch from './components/BookSearch';
import Bookshelf from './components/Bookshelf';
import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [showTitle, setShowTitle] = useState(true); 
  // return (
  //   <div className="App">
  //     <BookSearch /> {/* Add a search component here */}
  //     <Bookshelf books={books} />
  //   </div>
  // );
  useEffect(() => {
    const getBooksFromStorage = async() => {
      try {
        const storedBooks = localStorage.getItem('bookshelf');
        setBookshelf(storedBooks ? JSON.parse(storedBooks) : []);
      } catch (error) {
        console.error('Error fetching bookshelf from localStorage:', error);
      }
    };

    getBooksFromStorage();
  }, []);

  const addToBookshelf = (book) => {
    setBookshelf([...bookshelf, book]);
  };
  const removeFromBookshelf = () => {
    setBookshelf([]); 
    localStorage.removeItem('bookshelf'); // Removes bookshelf from localStorage
  };
  const handleViewBookshelfClick = () => {
    setShowTitle(!showTitle);
    window.location.href = '/Bookshelf'; // Navigate to Bookshelf page
  };
  return (
    <div className="App">
    {showTitle && <h1>My Book App</h1>} {/* Conditionally render title */}
    <button className="view-bookshelf-btn" onClick={handleViewBookshelfClick}>
      View My Bookshelf
    </button>
    <BookSearch addToBookshelf={addToBookshelf} />
    <Bookshelf bookshelf={bookshelf} />
    {bookshelf.length > 0 && (
      <button className="delete-bookshelf-btn" onClick={removeFromBookshelf}>
        Delete Bookshelf
      </button>
    )}
  </div>
  );
};

export default App;
