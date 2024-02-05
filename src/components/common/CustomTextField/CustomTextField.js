import React from "react";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
const CustomTextField = (props) => {
  const { id, label, variant, className, helperText, ...otherProps } = props;
  const labelStyle = {
    fontSize: "var(--size-16)",
    fontWeight: "400",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  };
  const helperTextStyle = {
    color: "#d32f2f",
  };
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <TextField
        style={{ width: "100%" }}
        id={id}
        variant={variant}
        className={className}
        InputLabelProps={{
          shrink: false,
        }}
        helperText={
          helperText && (
            <FormHelperText style={helperTextStyle}>
              {helperText}
            </FormHelperText>
          )
        }
        {...otherProps}
      />
    </div>
  );
};

export default CustomTextField;
