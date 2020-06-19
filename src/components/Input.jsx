import React from "react";
import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

const Input = ({ name, labelText, type, onChange, as, style, children }) => {
  return (
    <InputGroup style={style}>
      <label htmlFor={name}>{labelText}</label>
      <Field name={name} type={type} onChange={onChange} as={as}>
        {children}
      </Field>
      <StyledErrorMessage name={name} component="div" />
    </InputGroup>
  );
};

export default Input;

const InputGroup = styled.div`
  label {
    display: block;
  }

  input,
  select,
  textarea {
    padding: 0.5em;
    font-size: 1em;
    border: 0;
    background-color: #bdffd9;
    font-family: Poppins;

    &:focus {
      border: 1px solid #27ae60;
    }
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: #ff4f4f;
`;
