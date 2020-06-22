import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Column, Card } from "../components";
import Input from "../components/Input";
import { privateApi } from "../api";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfile } from "../actions/authActions";

const CreateProfileScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("bloggrToken");

  const profileValidator = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(3, "First Name is too short"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name is too short"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username is too short")
      .test("username-test", "Username is already taken", async function (
        value
      ) {
        try {
          const res = await privateApi(token).get(`/profile/${value}`);
          if (!res.data.success) return false;
          return true;
        } catch (err) {
          if (err.response.status === 404) {
            return true;
          }
          return false;
        }
      }),
  });

  const handleSubmit = async (values) => {
    const { firstName, lastName, username, gender } = values;
    setLoading(true);
    const res = await privateApi(token).post("/profile", {
      firstName,
      lastName,
      username,
      gender,
    });
    if (res.data.success) {
      dispatch(setProfile(res.data.profile));
    }
    setLoading(false);
    history.push(`/dashboard`);
  };

  return (
    <StyledContainer>
      <Column style={{ height: "100%" }}>
        <StyledInnerContainer>
          <Card>
            <StyledContent>
              <h1>CREATE PROFILE</h1>
              <div className="form">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    username: "",
                    gender: "m",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={profileValidator}
                >
                  {({ handleChange }) => (
                    <StyledForm>
                      <Input
                        labelText="First Name"
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Input
                        labelText="Last Name"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Input
                        labelText="Username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      />
                      <Input
                        labelText="Gender"
                        name="gender"
                        as="select"
                        onChange={handleChange}
                        style={{ marginBottom: "1em" }}
                      >
                        <option key="m" value="m">
                          Male
                        </option>
                        <option key="f" value="f">
                          Female
                        </option>
                      </Input>
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

export default CreateProfileScreen;

const StyledContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
      180deg,
      rgba(39, 174, 96, 0.35) 0%,
      rgba(39, 174, 96, 0.35) 100%
    ),
    url(${require("../assets/create-profile-bg.jpg")});
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

  select {
    width: 100%;
  }
`;
