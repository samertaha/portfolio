import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import {
  AddCircleOutlineRounded,
  DeleteOutlineRounded,
  Edit,
} from '@material-ui/icons';
import {
  Button,
  TextField,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import '../assets/styles/Admin.css';

const Admin = ({ projects, setProjects }) => {
  const [projectId, setProjectId] = useState(0);
  const [projectNameInput, setProjectNameInput] = useState('');
  const [projectImageInput, setProjectImageInput] = useState('');
  const [projectSkillsInput, setProjectSkillsInput] = useState('');
  const [projectGithubInput, setProjectGithubInput] = useState('');
  const [projectLiveUrlInput, setProjectLiveUrlInput] = useState('');
  const [projectFeaturedInput, setProjectFeaturedInput] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.from('#admin > *', {
      duration: 2,
      opacity: 0,
      delay: 1,
      stagger: 0.2,
    });
  }, []);

  const addProject = (event) => {
    event.preventDefault();
    console.log('samer ?! ', projectLiveUrlInput, projectFeaturedInput);
    axios
      .post('http://localhost:3001/createProject', {
        name: projectNameInput,
        image: projectImageInput,
        skills: projectSkillsInput,
        github: projectGithubInput,
        url: projectLiveUrlInput,
        featured: projectFeaturedInput,
      })
      .then((response) => {
        setProjects([...projects, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });

    setProjectNameInput('');
    setProjectImageInput('');
    setProjectSkillsInput('');
    setProjectGithubInput('');
    setProjectLiveUrlInput('');
    setProjectFeaturedInput(false);
  };

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:3001/project/${id}`)
      .then((response) => {
        setProjects([...projects.filter((project) => project._id !== id)]);
      })
      .catch((error) => setError(error));
  };

  const openUpdateDialog = (project) => {
    console.log(project);
    setOpen(true);
    setProjectId(project._id);
    setProjectNameInput(project.name);
    setProjectImageInput(project.image);
    setProjectSkillsInput(project.skills);
    setProjectGithubInput(project.github);
    setProjectLiveUrlInput(project.url);
    setProjectFeaturedInput(project.featured);
  };

  const saveProject = () => {
    console.log(projectId);
    axios
      .put(`http://localhost:3001/updateProject/${projectId}`, {
        name: projectNameInput,
        image: projectImageInput,
        skills: projectSkillsInput,
        github: projectGithubInput,
        url: projectLiveUrlInput,
        featured: projectFeaturedInput,
      })
      .then((response) => {
        let newProjects = [...projects];
        newProjects = newProjects.map((project) => {
          if (project._id === projectId)
            return {
              _id: projectId,
              name: projectNameInput,
              image: projectImageInput,
              skills: projectSkillsInput,
              github: projectGithubInput,
              url: projectLiveUrlInput,
              featured: projectFeaturedInput,
            };
          else return project;
        });

        setProjects([...newProjects]);
        setProjectNameInput('');
        setProjectImageInput('');
        setProjectSkillsInput('');
        setProjectGithubInput('');
        setProjectLiveUrlInput('');
        setProjectFeaturedInput(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

    setOpen(false);
  };

  const handleClose = () => {
    setProjectNameInput('');
    setProjectImageInput('');
    setProjectSkillsInput('');
    setProjectGithubInput('');
    setProjectLiveUrlInput('');
    setProjectFeaturedInput(false);
    setOpen(false);
  };

  return (
    <div id='admin'>
      <h1>projects</h1>
      <Container maxWidth='sm'>
        <form noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='projectName'
            label='Enter Project'
            name='ProjectName'
            autoFocus
            value={projectNameInput}
            onChange={(event) => setProjectNameInput(event.target.value)}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='projectImage'
            label='Enter Image URL'
            name='ProjectImage'
            autoFocus
            value={projectImageInput}
            onChange={(event) => setProjectImageInput(event.target.value)}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='projectSkills'
            label='Enter Used Skills'
            name='ProjectSkills'
            value={projectSkillsInput}
            onChange={(event) => setProjectSkillsInput(event.target.value)}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='projectGithub'
            label='Enter Github URL'
            name='ProjectGithub'
            value={projectGithubInput}
            onChange={(event) => setProjectGithubInput(event.target.value)}
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='projectLiveUrl'
            label='Enter Live URL'
            name='ProjectLiveUrl'
            value={projectLiveUrlInput}
            onChange={(event) => setProjectLiveUrlInput(event.target.value)}
          />

          <FormControlLabel
            label='Featured : '
            labelPlacement='start'
            control={
              <Checkbox
                variant='outlined'
                required
                id='projectFeatured'
                name='projectFeatured'
                checked={projectFeaturedInput}
                onChange={(event) =>
                  setProjectFeaturedInput(event.target.checked)
                }
              />
            }
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            onClick={addProject}
            disabled={
              !projectNameInput ||
              !projectImageInput ||
              !projectSkillsInput ||
              !projectGithubInput ||
              !projectLiveUrlInput
            }
            startIcon={<AddCircleOutlineRounded />}
          >
            Add Project
          </Button>
        </form>
        <List dense={true}>
          {projects.map((project) => (
            <ListItem key={project._id}>
              <ListItemText primary={project.name} />

              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='Edit'
                  onClick={() => openUpdateDialog(project)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => deleteProject(project._id)}
                >
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='projectName'
              label='Enter Project'
              name='ProjectName'
              autoFocus
              value={projectNameInput}
              onChange={(event) => setProjectNameInput(event.target.value)}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='projectImage'
              label='Enter Image URL'
              name='ProjectImage'
              autoFocus
              value={projectImageInput}
              onChange={(event) => setProjectImageInput(event.target.value)}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='projectSkills'
              label='Enter Used Skills'
              name='ProjectSkills'
              value={projectSkillsInput}
              onChange={(event) => setProjectSkillsInput(event.target.value)}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='projectGithub'
              label='Enter Github URL'
              name='ProjectGithub'
              value={projectGithubInput}
              onChange={(event) => setProjectGithubInput(event.target.value)}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='projectLiveUrl'
              label='Enter Live URL'
              name='ProjectLiveUrl'
              value={projectLiveUrlInput}
              onChange={(event) => setProjectLiveUrlInput(event.target.value)}
            />

            <FormControlLabel
              label='Featured : '
              labelPlacement='start'
              control={
                <Checkbox
                  variant='outlined'
                  required
                  id='projectFeatured'
                  name='projectFeatured'
                  checked={projectFeaturedInput}
                  onChange={(event) =>
                    setProjectFeaturedInput(event.target.checked)
                  }
                />
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={saveProject} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};
export default Admin;
