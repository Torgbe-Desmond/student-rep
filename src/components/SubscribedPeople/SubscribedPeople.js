// PeopleList.jsx
import React from "react";
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";

const SubscribedPeople = ({ people }) => {
  if (!people?.length) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Shared With
      </Typography>
      <List dense>
        {people.map((person, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{person.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={person.name} secondary={person.email} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SubscribedPeople;
