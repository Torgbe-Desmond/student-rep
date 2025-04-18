import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SubscribedPeople from "../SubscribedPeople/SubscribedPeople";

const DrawerContent = ({ details, SwitchLabel }) => {
  //   if (!details) return null;

  console.log("details", details);

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexDirection: "column",
      }}
    >
      {details?.mimetype !== "Folder" ? (
        <Avatar
          src={details?.url}
          variant="square"
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "200px",
            background: "#CCC",
          }}
        >
          <FolderOpenIcon sx={{ fontSize: "200px", color: "#FFF" }} />
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          width: "100%",
          gap: 1,
          fontSize: "18px",
        }}
      >
        <Typography variant="h6">{details?.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Last Modified: {new Date(details?.lastUpdated).toLocaleString()}
        </Typography>
      </Box>

      {details?.mimetype === "Folder" && (
        <>
          <Box sx={{ width: "100%" }}>{SwitchLabel && <SwitchLabel />}</Box>

          <SubscribedPeople
            people={[
              { name: "Alice Johnson", email: "alice@example.com" },
              { name: "Bob Smith", email: "bob.smith@example.com" },
              { name: "Charlie Lee", email: "charlie.lee@example.com" },
            ]}
          />
        </>
      )}
    </Box>
  );
};

export default DrawerContent;
