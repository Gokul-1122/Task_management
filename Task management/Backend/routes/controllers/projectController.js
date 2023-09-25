const { Project } = require('../../models');

const createProject = async (req, res) => {
  try {
    console.log("svgdgbdr");
    const { name } = req.body;
    const project = await Project.create({ name });
    res.json({ projectId: project.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getProjects = async (req, res) => { 
  try {
    let projects = await Project.findAll(); 
    if (projects) {
      res.send({ statusCode: 200, projects });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};




const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




module.exports = {
  deleteProject,
  createProject,
  getProjects 
};
