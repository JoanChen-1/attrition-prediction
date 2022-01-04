import React from "react";
import Chip from '@mui/material/Chip';
import shadeColor from "./function/shadeColor";

function ColorfulChip(props) {
  const { color, label, className } = props;
  return (
    <Chip
      style={{
        color: color,
        backgroundColor: shadeColor(color, 0.7)
      }}
      label={label}
      className={className ? className : null}
      sx={{fontFamily: 'Karla, sans-serif'}}
    />
  );
}
export default ColorfulChip;
