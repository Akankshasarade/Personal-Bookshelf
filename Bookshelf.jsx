// Bookshelf.jsx
import React from 'react';

const Bookshelf = ({ bookshelf }) => {
  return (
    <div className="bookshelf">
      <h2>My Bookshelf</h2>
      {bookshelf && bookshelf.length > 0 ? (
        <ul className="bookshelf-list">
          {bookshelf.map((book) => (
            <li key={book.key}>
              <p className="book-title">{book.title}</p>
              <p className="book-authors">
                {book.author_name && book.author_name.join(', ')}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your bookshelf is empty.</p>
      )}
    </div>
  );
};

export default Bookshelf;
