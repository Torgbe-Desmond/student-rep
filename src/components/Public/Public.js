import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchTerm,
  getSearchHistory,
  searchFilesOrDirectories,
} from "../../Features/WorkSpace";
import ClearIcon from "@mui/icons-material/Clear";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./Public.css";

function Public() {
  const [searchTerm, setSearchTerm] = useState("");
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const searchResults = useSelector((state) => state.work.searchResults);
  const dispatch = useDispatch();
  const reference_Id = localStorage.getItem("reference_Id");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchFilesOrDirectories({ reference_Id, searchTerm }));
      }
      dispatch(getSearchHistory({ reference_Id }));
    }, 500);
    if (searchTerm === "") {
      dispatch(clearSearchTerm());
    }
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch, reference_Id]);

  // Handle subscribe button click
  const handleSubscribe = (id) => {
    console.log(`Subscribed to item with id: ${id}`);
    // Implement your subscribe logic here
  };

  // Handle clear button click
  const handleClear = () => {
    setSearchTerm("");
    // Optionally, clear the search results if needed
    // dispatch(clearSearchResults());
  };

  return (
    <div className="public__container">
      <div className="public__search">
        <TextField
          sx={{
            color: isDarkMode ? "#FFF" : "",
            "& .MuiInputBase-input": {
              color: isDarkMode ? "#FFF" : "",
              background: isDarkMode ? "" : "",
            },
            "& .MuiInputBase-input::placeholder": {
              color: isDarkMode ? "#FFF" : "",
            },
          }}
          className="public-input"
          placeholder="Search files by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Box mt={2} mb={15}>
        {searchTerm && (
          <TableContainer
            component={Paper}
            sx={{ width: "400px", borderRadius: "none", cursor: "pointer" }}
          >
            <Table>
              <TableBody>
                {searchResults.map((item,index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  );
}

export default Public;
