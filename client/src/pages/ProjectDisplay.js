import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../assets/styles/ProjectDisplay.css';
import axios from 'axios';

function ProjectDisplay() {
  const { id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getProject/${id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className='project'>
      <h1> {project.name}</h1>
      <img src={project.image} alt={project.name} />
      <p>
        <b>Skills:</b> {project.skills}
      </p>
      <a href={project.github} target='_blank' rel='noreferrer'>
        <GitHubIcon />
      </a>
    </div>
  );
}

export default ProjectDisplay;
