import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Card, Typography, List, ListItem, ListItemText } from "@mui/material";
import TicketService from '../services/ticketService';
import AuthService from "../services/authService";

function TicketList({ projectId }) {
  const token = AuthService.getToken();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    console.log("use effect is running");
    async function fetchTicketsByProjectId() {
      const tickets = await TicketService.getTicketByProjectId(token, projectId);
      // console.log(tickets.length);
      setTickets(tickets.content);
    }

    fetchTicketsByProjectId();
  }, []);

  return (<>
  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  overflow: 'auto' ,  flexGrow: "1", width: '90%' }} >
    <Typography variant="h6" >
      Tickets:
    </Typography>
    {tickets === null ? (
      <Typography variant="body1" align="center">
        Loading...
      </Typography>
    ) : tickets.length > 0 ? (
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
      >
        <ul>
          {tickets.map((ticket, index) => (
           
              <ListItem key={index} >
                 <Link style={{
    textDecoration: 'none', // Remove underline and styling
    color: 'inherit', // Inherit the color from parent element
  }} to={`/projects/${ticket.projectId}/tickets/${ticket.ticketId}`}> 
                <ListItemText
                  secondary={`Ticket ID: ${ticket.ticketId}`}
                  primary={`${ticket.subject}`}
                />
                 </Link>
              </ListItem>
           
          ))}
        </ul>
      </List>
    )
      : (
        <Typography variant="body1" align="center">
          No Tickets available.
        </Typography>
      )
    }
  </Card>
  </>
  )
};

export default TicketList;

