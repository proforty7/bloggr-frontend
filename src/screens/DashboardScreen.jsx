import React, { useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "../components/Navbar";
import { Card, Column } from "../components";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import Input from "../components/Input";
import { privateApi } from "../api";
import { setProfile, setBlog } from "../actions/authActions";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("bloggrToken");

  const blogValidator = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    type: Yup.string().required("Type is required"),
    description: Yup.string(),
    tags: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    const { name, type, description, tags } = values;
    setLoading(true);
    const res = await privateApi(token).post("/blog", {
      name,
      type,
      description,
      tags: tags.trim().split(","),
    });
    if (res.data.success) {
      dispatch(setBlog(res.data.blog));
    }
    setLoading(false);
  };

  const user = useSelector((state) => state.auth.user);
  return (
    <StyledContainer>
      <Navbar />
      <Column>
        {user.profile.blog ? (
          <StyledGrid>
            <StyledCard dashed>
              <div className="head">Create New</div>
              <div className="btn">+</div>
            </StyledCard>
            <StyledCard>Create New</StyledCard>
            <StyledCard>Create New</StyledCard>
          </StyledGrid>
        ) : (
          <StyledBlogContainer>
            <StyledHead>Looks like you didn't setup your blog yet!</StyledHead>
            <Card>
              <StyledContent>
                <h1>SET UP BLOG</h1>
                <div className="form">
                  <Formik
                    initialValues={{
                      name: "",
                      type: "personal",
                      description: "",
                      tags: "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={blogValidator}
                  >
                    {({ handleChange }) => (
                      <StyledForm>
                        <Input
                          labelText="Name"
                          name="name"
                          type="text"
                          onChange={handleChange}
                          style={{ marginBottom: "1em" }}
                        />

                        <Input
                          labelText="Type"
                          name="type"
                          as="select"
                          onChange={handleChange}
                          style={{ marginBottom: "1em" }}
                        >
                          <option key="personal" value="personal">
                            Personal
                          </option>
                          <option key="business" value="business">
                            Business
                          </option>
                          <option key="professional" value="professional">
                            Professional
                          </option>
                          <option key="niche" value="niche">
                            Niche
                          </option>
                          <option key="media" value="media">
                            Media
                          </option>
                          <option key="freelance" value="freelance">
                            Freelance
                          </option>
                        </Input>
                        <Input
                          labelText="Desciption"
                          name="description"
                          type="text"
                          as="textarea"
                          onChange={handleChange}
                          style={{ marginBottom: "1em" }}
                        />
                        <Input
                          labelText="Tags"
                          name="tags"
                          type="text"
                          onChange={handleChange}
                          style={{ marginBottom: "1em" }}
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
          </StyledBlogContainer>
        )}
      </Column>
    </StyledContainer>
  );
};

export default DashboardScreen;

const StyledContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(39, 174, 96, 0.29),
      rgba(39, 174, 96, 0.29)
    ),
    url(${require("../assets/dashboard-bg.jpg")});
  background-size: cover;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;
  margin-top: 2rem;
`;

const StyledCard = styled.div`
  background-color: #fff;
  padding: 2rem;
  height: 200px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 1s all ease-out;
  }

  .head {
    font-size: 2rem;
  }

  .btn {
    font-size: 3rem;
  }

  ${(props) =>
    props.dashed &&
    css`
      border: 3px dashed #27ae60;
    `}
`;

const StyledBlogContainer = styled.div`
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHead = styled.p`
  margin: 0px 0px 2rem 0px;
  font-size: 2rem;
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

  textarea {
    width: 95%;
  }
`;
