const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
});

const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;
