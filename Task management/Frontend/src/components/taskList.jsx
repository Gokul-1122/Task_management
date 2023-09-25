import React, { useState, useEffect } from 'react';
import '../css/taskList.css';
import { FaTrash, FaSearch } from 'react-icons/fa';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const tasksResponse = await fetch('http://localhost:3001/tasks/');
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.tasks);

        const projectsResponse = await fetch('http://localhost:3001/projects/');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData.projects);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []); 

  const handleTaskDelete = async (taskId) => {
    console.log("dlte");
    try {
      await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'DELETE',
      });
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  

  const getProjectName = (projectId) => {
    console.log('Projects:', projects);
    const project = projects.find(project => project.id === projectId);
    console.log('Found Project:', project);
    console.log(projects.projectId);
    return project ? project.name : 'Unknown Project';
  };
  

  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: status === 'completed' } : task
      );
      setTasks(updatedTasks);

      await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: status === 'completed' }),
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())||
    task.deadline.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="task-list">
      <div className='search'>
        <button><FaSearch onClick={toggleSearchBar} /></button> 
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Task Name</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map(task => (
            <tr key={task.id}>
              <td>{getProjectName(task.project_id)}</td>
              <td>{task.name}</td>
              <td>{task.deadline}</td>
              <td>
                <div className='status'>
                  <select 
                    value={task.completed ? 'completed' : 'on-progress'}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="on-progress">On Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
              </td>
              <td className="dlte-task">
                <button onClick={() => handleTaskDelete(task.id)}><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
