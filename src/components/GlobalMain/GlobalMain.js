import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RepList from "../../components/RepList/RepList";
import PrimarySearchAppBar from "../../components/PrimarySearchAppBar/PrimarySearchAppBar";

// Tab panel helper component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function GlobalMain({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <PrimarySearchAppBar
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Box sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="rep category tabs"
          >
            <Tab label="All Reps" {...a11yProps(0)} />
            <Tab label="Top Rated" {...a11yProps(1)} />
            <Tab label="Newest" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={tabIndex} index={0}>
          <RepList searchTerm={searchTerm} category="all" />
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={1}>
          {/* <RepList searchTerm={searchTerm} category="top-rated" /> */}
        </CustomTabPanel>
        <CustomTabPanel value={tabIndex} index={2}>
          {/* <RepList searchTerm={searchTerm} category="newest" /> */}
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default GlobalMain;
