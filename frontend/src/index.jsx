// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App'; // Your main App component
// import './styles.css'; // Global styles

// // Render the App component into the DOM
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root') // The root element in the HTML
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

