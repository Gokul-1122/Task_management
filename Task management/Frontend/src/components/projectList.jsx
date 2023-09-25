import React, { useState, useEffect } from 'react';
import '../css/projectList.css';
import { FaTrash, FaSearch } from 'react-icons/fa';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('http://localhost:3001/projects/');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchProjects();
  }, []); 

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await fetch(`http://localhost:3001/projects/${projectId}`, {
        method: 'DELETE',
      });

      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="project-list">
      <div className='project-search'>
        <button><FaSearch onClick={toggleSearchBar} /></button> 
        {isSearchVisible && (
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
      </div>
      <h2>Project List</h2>
      <ul>
        {filteredProjects.map(project => (
          <li key={project.id}>
            <div className='dlte-btn'>
              <p>{project.name}</p>
              <button onClick={() => handleDeleteProject(project.id)}><FaTrash/></button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
