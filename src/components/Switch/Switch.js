import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function SwitchLabel() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch  />}
        label="Make Folder Public"
      />
      {/* <FormControlLabel required control={<Switch />} label="Required" /> */}
      {/* <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
    </FormGroup>
  );
}
