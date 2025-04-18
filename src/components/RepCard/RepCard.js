import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function RepCard({
  image,
  time = "12:09 PM",
  title = "My new project",
  description = "Soo.. I glad to introduce my new project. The customer is a very famous brand and it’s very i...",
  likes = 23,
  saved = 12,
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
        fontFamily: "sans-serif",
      }}
    >
      {/* Blurred background image with lock */}
      <Box
        sx={{
          position: "relative",
          height: 140,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LockIcon sx={{ fontSize: 18 }} />
            Locked
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ px: 2, py: 1.5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="600">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {time}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 1 }}
        >
          {description}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <FavoriteBorderIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption">{likes} likes</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <BookmarkBorderIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption">{saved} saved</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
