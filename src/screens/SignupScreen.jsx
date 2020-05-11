import React from "react";
import styled from "styled-components";
import { Column, Card, StyledField } from "../components";
import { Formik, Form } from "formik";
import Input from "../components/Input";

const SignupScreen = () => {
  return (
    <StyledContainer>
      <Column>
        <StyledInnerContainer>
          <Card style={{ width: "60%" }}>
            <StyledContent>
              <h1>CREATE ACCOUNT</h1>
              <div className="form">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                    agree: false,
                  }}
                >
                  {({ handleChange }) => (
                    <Form>
                      <Input
                        labelText="Email"
                        name="email"
                        onChange={handleChange}
                      />
                      <Input
                        labelText="Password"
                        name="password"
                        onChange={handleChange}
                      />
                      <Input
                        labelText="Confirm Password"
                        name="confirmPassword"
                        onChange={handleChange}
                      />
                      {/* <Input
                        labelText="I agree to terms and conditions"
                        name="agree"
                        type="radio"
                        onChange={handleChange}
                      /> */}
                    </Form>
                  )}
                </Formik>
              </div>
            </StyledContent>
          </Card>
        </StyledInnerContainer>
      </Column>
    </StyledContainer>
  );
};

export default SignupScreen;

const StyledContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
      180deg,
      rgba(39, 174, 96, 0.35) 0%,
      rgba(39, 174, 96, 0.35) 100%
    ),
    url(${require("../assets/signup1.jpg")});
`;

const StyledInnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.div`
  padding: 2em;

  h1 {
    text-align: center;
  }

  .form {
    label {
      margin-bottom: 5px;
    }

    input {
      margin-bottom: 1em;
    }
  }
`;
