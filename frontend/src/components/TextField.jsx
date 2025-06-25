import React from "react";
import TextField from "@mui/material/TextField";

const CustomTextField = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  readOnly = false,
  variant = "outlined",
  helperText = "",
  size = "medium",
  sx = {},
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      disabled={disabled}
      InputProps={{
        readOnly: readOnly,
      }}
      variant={variant}
      helperText={helperText}
      size={size}
      fullWidth
      sx={{ m: 1, ...sx }}
      {...props}
    />
  );
};

export default CustomTextField;
