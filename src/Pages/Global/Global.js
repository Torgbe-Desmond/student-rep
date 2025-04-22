import React, { useState } from "react";
import "./Global.css";
import GlobalMain from "../../components/GlobalMain/GlobalMain";
import { Button } from "@mui/material";
import LeftSidebar from "../../components/Sidebar/Sidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

function Global() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (open) => () => {
    setIsSidebarOpen(open);
  };

  return (
    <div className="global-container">
      {/* <LeftSidebar
        open={isSidebarOpen}
        onClose={toggleSidebar(false)}
        primaryItems={["Dashboard", "Messages", "Profile", "Settings"]}
        secondaryItems={["Help", "Logout"]}
      /> */}
      <GlobalMain toggleSidebar={toggleSidebar} />
      {/* <RightSidebar
        open={isSidebarOpen}
        onClose={toggleSidebar(false)}
        primaryItems={["Dashboard", "Messages", "Profile", "Settings"]}
        secondaryItems={["Help", "Logout"]}
      /> */}
    </div>
  );
}

export default Global;
