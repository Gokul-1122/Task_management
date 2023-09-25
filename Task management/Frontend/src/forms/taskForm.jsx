import React, { useState } from 'react';
import "../css/taskform.css";

const TaskForm = ({ projects, addTask }) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]?.id);
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskName.trim() !== '' && deadline.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            project_id: selectedProject,
            name: taskName,
            deadline
          })
        });
        const data = await response.json();
        addTask(data.taskId);
        setTaskName('');
        setDeadline('');
        setError(null); // Reset error state on successful submission
      } catch (error) {
        setError('Error adding task');
        console.error('Error:', error);
      }
    }
  };

  const handleReload = () => {
    window.location.reload();
  };
  

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <div className="form-group">
        <label>Select Project:</label>
        <select
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
        >
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
      </div>
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          placeholder="Enter deadline"
        />
      </div>
      <div className='addtask'>
        <button onClick={handleReload} type="submit">Add Task</button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default TaskForm;
