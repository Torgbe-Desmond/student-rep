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

      {details.mimetype === "Folder" && (
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gap: 1,
            fontSize: "18px",
          }}
        >
          <Typography variant="h6">{details?.name}</Typography>
          {details?.mimetype === "Folder" && (
            <>
              <Box sx={{ width: "100%" }}>{SwitchLabel && <SwitchLabel />}</Box>
            </>
          )}
          <Typography variant="body3" color="text.secondary">
            Last Modified: {new Date(details?.lastUpdated).toLocaleString()}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Mimetype: {details?.mimetype}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Folders: {details?.subDirectories?.length} Folders
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Files: {details?.files?.length} Files
          </Typography>
        </Box>
      )}

      {details?.mimetype !== "Folder" && (
        <Box
          sx={{
            display: "grid",
            width: "100%",
            gap: 1,
            fontSize: "18px",
          }}
        >
          <Typography variant="h6">{details?.name}</Typography>
          <Typography variant="body3" color="text.secondary">
            Last Modified: {new Date(details?.lastUpdated).toLocaleString()}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Mimetype: {details?.mimetype}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Size: {details?.size}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DrawerContent;
