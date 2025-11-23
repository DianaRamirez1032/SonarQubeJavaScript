import React from 'react';
import { createRoot } from 'react-dom/client'
// Se le agrega la extención .jsx al importar App
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(<App />)


