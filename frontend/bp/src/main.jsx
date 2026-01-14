import React,{StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AiSuggestion from './AiSuggestion.jsx'
import Doctors from './Doctors.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ai-suggestion" element={<AiSuggestion />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
