import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDisplay from './pages/ProjectDisplay';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './pages/Admin';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/getProjects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home projects={projects} />} />
          <Route path='/projects' element={<Projects projects={projects} />} />
          <Route
            path='/project/:id'
            element={<ProjectDisplay projects={projects} />}
          />
          <Route path='/experience' element={<Experience />} />
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/admin'
            element={<Admin projects={projects} setProjects={setProjects} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
