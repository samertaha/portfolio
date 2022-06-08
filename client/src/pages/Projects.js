import React, { useEffect } from 'react';
import ProjectItem from '../components/ProjectItem';
import { gsap } from 'gsap';

import '../assets/styles/Projects.css';

function Projects({ projects }) {
  useEffect(() => {
    gsap.from('.projects > *', {
      duration: 2,
      opacity: 0,
      delay: 0,
      stagger: 0.2,
    });
  }, []);
  return (
    <div className='projects'>
      <h1
        style={{
          backgroundColor: '#ffe63e',
          color: '#000',
          marginTop: '1.5rem',
          padding: '0 0.5rem',
        }}
      >
        {' '}
        My Personal Projects
      </h1>
      <div className='projectList'>
        {projects.map((project) => {
          return (
            <ProjectItem
              key={project._id}
              id={project._id}
              name={project.name}
              image={project.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
