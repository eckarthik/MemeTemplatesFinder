import React from "react";
import { Form } from "react-bootstrap";
import classes from "./FormGroup.module.css";
const FormGroup = React.forwardRef((props, ref) => {
  return (
    <Form.Group className="mb-3" controlId={props.inputId}>
      <Form.Label>{props.inputLabel}</Form.Label>
      <Form.Control
        type={props.inputType}
        ref={ref}
        placeholder={props.placeholder}
        className={classes.form_control_input}
      />
      {props.inputHelperText && (
        <Form.Text className="text-muted">{props.inputHelperText}</Form.Text>
      )}
    </Form.Group>
  );
});

export default FormGroup;
