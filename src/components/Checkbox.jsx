import React from "react";
import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

const Checkbox = ({ name, labelText, type, onChange, style }) => {
  return (
    <InputGroup style={style}>
      <Field name={name} type="checkbox" onChange={onChange} />
      <label htmlFor={name}>{labelText}</label>
      <StyledErrorMessage name={name} component="div" />
    </InputGroup>
  );
};

export default Checkbox;

const InputGroup = styled.div`
  label {
  }

  label::before {
    content: "";
    background: #bdffd9;
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    padding: 2px;
    margin-right: 10px;
  }

  input {
    opacity: 0;
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
  }

  input:checked + label:before {
    background: #27ae60;
    transition: all 0.2s ease-out;
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: #ff4f4f;
`;
