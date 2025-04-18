import React from "react";
import { Box, Typography } from "@mui/material";
import NewList from "../NewList/NewList";

const HandleList = ({
  title,
  data,
  tableLayout,
  isDarkMode,
  setOpen,
  setDetails,
  setSelectedItems,
  setSelectedFilesForOptions,
  setSelectedFoldersForOptions,
  handleReload,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      <Box>
        <Typography sx={{ fontSize: "18px" }}>{title}</Typography>
      </Box>
      <NewList
        setOpen={setOpen}
        setDetails={setDetails}
        tableLayout={tableLayout}
        name={title}
        isDarkMode={isDarkMode}
        initialFolderData={data}
        selectedFoldersState={setSelectedItems}
        setSelectedFilesForOptions={setSelectedFilesForOptions}
        setSelectedFoldersForOptions={setSelectedFoldersForOptions}
        handleReload={handleReload}
      />
    </>
  );
};

export default HandleList;
