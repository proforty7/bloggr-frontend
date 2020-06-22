import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Column, Card, StyledLink } from "../components";
import Input from "../components/Input";
import { authApi } from "../api";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/authActions";

const SigninScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const accountValidator = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);
    try {
      const res = await authApi.post("/signin", {
        email,
        password,
      });

      if (res.data.success) {
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        localStorage.setItem("bloggrToken", res.data.token);
      }
      setLoading(false);
      history.push(`/dashboard`);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Column style={{ height: "100%" }}>
        <StyledInnerContainer>
          <Card>
            <StyledContent>
              <h1>SIGN IN</h1>
              <div className="form">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
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
                      <Button loading={loading}>
                        <div>SIGN IN</div>
                        <img
                          src={require("../assets/arrow-right.png")}
                          alt="arrow-right"
                        />
                      </Button>
                      <StyledLink to="/signup">
                        Haven't registered yet? Click here
                      </StyledLink>
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

export default SigninScreen;

const StyledContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
      180deg,
      rgba(39, 174, 96, 0.35) 0%,
      rgba(39, 174, 96, 0.35) 100%
    ),
    url(${require("../assets/signin-bg.jpg")});
  background-size: cover;
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
