// src/pages/ProjectsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import ProjectService from '../services/projectService';
import AuthService from '../services/authService';

function ProjectsPage() {
  const [projects, setProjects] = useState(null); // Initialize with null
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchProjects() {
      const token = AuthService.getToken();
      const projectsData = await ProjectService.getProjects(token, currentPage);
      console.log(projectsData);
      setProjects(projectsData.content);
      setTotalPages(projectsData.totalPages);
      console.log(totalPages);
    }

    fetchProjects();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="md" sx={{display:'flex', flexDirection:'column', height:'90vh'}}>
    <Typography variant="h4" component="h1" align="center" gutterBottom marginTop={5} > 
      Projects Page
    </Typography>
    <Paper sx={{flex:1, flexDirection:'column' , display:'flex'}}>
    {projects === null ? (
      <Typography variant="body1" align="center" >
        Loading...
      </Typography>
    ) : projects.length > 0 ? (
      <List>
        {projects.map((project) => (
          <ListItem key={project.projectId} component={Link} to={`/projects/${project.projectId}`}>
            <ListItemText primary={project.name} secondary={project.description} />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body1" align="center">
        No projects available.
      </Typography>
    )}
    {totalPages > 1 && (
      <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom:10 }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            style={{ margin: '0 5px' }}
            onClick={() => handlePageChange(index)}
            size='small'
          >
            {index + 1}
          </Button>
        ))}
      </div>
    )}
    </Paper>
  </Container>
  );
}

export default ProjectsPage;