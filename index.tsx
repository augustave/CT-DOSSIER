import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Could not find root element '#root' to mount React application.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to mount application:", error);
    rootElement.innerHTML = `<div style="padding: 2rem; color: red; font-family: monospace;"><h1>System Error</h1><p>${error instanceof Error ? error.message : 'Unknown error'}</p></div>`;
  }
}