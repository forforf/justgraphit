import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const mountPoint = 'root'
const container = document.getElementById(mountPoint)

if (container !== null) {
    const root = createRoot(container)
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
  console.warn(`React could not find mount point with element id of: ${mountPoint}`)
}



