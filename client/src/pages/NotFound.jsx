// src/pages/NotFound.jsx
import React from 'react';
import './NotFound.css'; // Make sure to create and import a corresponding CSS file

const NotFound = () => {
  return (
    <section>
      <div className="container">
        <div className="text">
          <h1>Page Not Found</h1>
          <p>We can't seem to find the page you're looking for. Please check the URL for any typos.</p>
          <ul className="menu">
            <li><a href="/">Go to Homepage</a></li>
          </ul>
        </div>
        <img className="image" src="src/error.png" alt="error" ></img>
      </div>
    </section>
  );
};

export default NotFound;
