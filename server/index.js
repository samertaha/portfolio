const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ProjectModel = require('./models/Projects');

const cors = require('cors');
app.use(express.json());
app.use(cors());

mongoose.connect(
  'mongodb+srv://samertaha:5NqAeoPR@cluster0.ccilm2c.mongodb.net/portfolio'
);

app.get('/getProjects', (req, res) => {
  ProjectModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.get('/getProject/:id', (req, res) => {
  let id = req.params.id;
  ProjectModel.findById(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete('/project/:id', (req, res) => {
  let id = req.params.id;
  console.log('delete id: ', id);
  ProjectModel.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.log('error', err);
      res.json(err);
    } else {
      console.log('success', result);
      res.json(result);
    }
  });
});

app.post('/createProject', async (req, res) => {
  const project = req.body;
  const newProject = new ProjectModel(project);
  await newProject.save();

  res.json(newProject);
});

app.put('/updateProject/:id', async (req, res) => {
  console.log('im here!');
  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatedProject,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, () => {
  console.log('server runs. wow!');
});
