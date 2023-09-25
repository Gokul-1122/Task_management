const express = require('express');
const router = express.Router();
const projectController = require('./controllers/projectController');

router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);
router.delete('/:id', projectController.deleteProject);

  
module.exports = router;
