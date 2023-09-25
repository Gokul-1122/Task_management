import React, { useState } from 'react';
import "../css/ProjectForm.css";

const ProjectForm = ({ addProject }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3001/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: projectName
          })
        });
        console.log(response);
        // addProject(data.projectId);
        setProjectName('');
        setError(null); 
      } catch (error) {
        setError('Error adding project');
        console.error('Error:', error);
      }
    }
  };
  

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h2>Add Project</h2>
      <div className="form-groupp">
        <label>Project Name:</label>
        <input
          type="text"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
      </div>
      <div className='addproject'>
        <button onClick={handleReload} type="submit">Add Project</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default ProjectForm;
