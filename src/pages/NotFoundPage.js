import React from 'react';
import { Container, Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" component="h1">
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" component="p">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
}

export default NotFoundPage;
