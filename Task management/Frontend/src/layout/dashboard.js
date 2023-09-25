import React, { useState, useEffect } from 'react';
import ProjectForm from '../forms/ProjectForm';
import ProjectList from '../components/projectList';
import TaskForm from '../forms/taskForm';
import TaskList from '../components/taskList';
import '../App.css';


export const Dashboard = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchProjectsAndTasks = async () => {
        try {
          const projectsResponse = await fetch('http://localhost:3001/projects');
          const projectsData = await projectsResponse.json();
          setProjects(projectsData.projects);
  
          const tasksResponse = await fetch('http://localhost:3001/tasks');
          const tasksData = await tasksResponse.json();
          setTasks(tasksData.tasks);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchProjectsAndTasks();
    }, []);
  
    const handleProjectSelect = (projectId) => {
      setSelectedProject(projectId);
    };
  
    const handleClearProjectSelection = () => {
      setSelectedProject(null);
    };
  
    const addProject = async (projectName) => {
      try {
        const response = await fetch('http://localhost:3001/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: projectName }),
        });
        
        const data = await response.json();
        const newProject = { id: data.projectId, name: projectName };
        setProjects([...projects, newProject]);
      } catch (error) {
        console.error('Error adding project:', error);
      }
    };
  
    const handleProjectDelete = async (projectId) => {
      try {
        await fetch(`http://localhost:3001/projects/${projectId}`, {
          method: 'DELETE',
        });
    
        const updatedProjects = projects.filter(project => project.id !== projectId);
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };
    
  
    const addTask = async (taskId) => {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
        const data = await response.json();
        const newTask = { id: data.taskId, project_id: selectedProject, name: data.name, deadline: data.deadline, completed: false };
        setTasks([...tasks, newTask]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    const deleteTask = async (taskId) => {
      try {
        await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: 'DELETE',
        });
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
    return (
      <div className="App">
          <>
            <div className="project-section">
              <ProjectForm addProject={addProject} />
              <ProjectList
                deleteProject={handleProjectDelete} 
                handleProjectSelect={handleProjectSelect}
                selectedProject={selectedProject}
                handleClearProjectSelection={handleClearProjectSelection}
                projects={projects}
              />
            </div>
            <div className="task-section">
              {selectedProject && <TaskForm projects={projects} addTask={addTask} />}
              <TaskForm projects={projects} addTask={addTask} />
              <TaskList
                projectId={selectedProject}
                tasks={tasks}
                deleteTask={deleteTask}
              />
            </div>
          </>
      </div>
    );
}
export default Dashboard;
