import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Column, Card } from "../components";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import { authApi } from "../api";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/authActions";

const SignupScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const accountValidator = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password is too short")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .test("password-match", "Passwords do not match", function (value) {
        return this.parent.password === value;
      }),
    agree: Yup.bool().oneOf([true], "You need to agree to terms to continue."),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      await authApi.post("/signup", {
        email,
        password,
      });
      const res = await authApi.post("/signin", {
        email,
        password,
      });

      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, ...res.data.token }));
        localStorage.setItem("bloggrToken", res.data.token);
      }
      setLoading(false);
      history.push("/create-profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <StyledContainer>
      <Column style={{ height: "100%" }}>
        <StyledInnerContainer>
          <Card>
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
                  onSubmit={handleSubmit}
                  validationSchema={accountValidator}
                >
                  {({ handleChange }) => (
                    <StyledForm>
                      <Input
                        labelText="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Input
                        labelText="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Input
                        labelText="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Checkbox
                        labelText="I agree to terms and conditions"
                        name="agree"
                        onChange={handleChange}
                      />
                      <Button loading={loading}>
                        <div>Continue</div>
                        <img
                          src={require("../assets/arrow-right.png")}
                          alt="arrow-right"
                        />
                      </Button>
                    </StyledForm>
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
  }

  Button {
    margin-top: 1em;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 1em;
    padding-right: 1em;
    text-align: center;

    div {
      flex: 1;
    }
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }
`;
