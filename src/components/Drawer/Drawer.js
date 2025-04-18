import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DrawerContent from "../DrawerContent/DrawerContent";

const CustomDrawer = ({
  open,
  onClose,
  details,
  SwitchLabel,
  onOpen,
  content,
  anchor = "right",
}) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      onOpen={onOpen || (() => {})}
    >
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
        role="presentation"
        onKeyDown={onClose}
      >
        <DrawerContent details={details} SwitchLabel={SwitchLabel} />
      </Box>
    </SwipeableDrawer>
  );
};

export default CustomDrawer;
