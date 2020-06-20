import React, { useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "../components/Navbar";
import { Card, Column } from "../components";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import Input from "../components/Input";
import { privateApi } from "../api";
import { setBlog } from "../actions/authActions";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const CreatePostScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("bloggrToken");

  const postValidator = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    subtitle: Yup.string(),
    content: Yup.string(),
  });

  const handleSubmit = async (values) => {
    // const { name, type, description, tags } = values;
    // setLoading(true);
    // const res = await privateApi(token).post("/blog", {
    //     name,
    //     type,
    //     description,
    //     tags: tags.trim().split(","),
    // });
    // if (res.data.success) {
    //     dispatch(setBlog(res.data.blog));
    // }
    // setLoading(false);
  };

  const user = useSelector((state) => state.auth.user);
  return (
    <StyledContainer>
      <Navbar />
      <Column>
        <StyledBlogContainer>
          <Card style={{ width: "100%" }}>
            <StyledContent>
              <h1>CREATE POST</h1>
              <div className="form">
                <Formik
                  initialValues={{
                    title: "",
                    subtitle: "",
                    content: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={postValidator}
                >
                  {({ handleChange }) => (
                    <StyledForm>
                      <input
                        className="title"
                        placeholder="Title"
                        type="text"
                        onChange={handleChange}
                      />
                      <input
                        className="subtitle"
                        placeholder="Subtitle"
                        type="text"
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
        </StyledBlogContainer>
      </Column>
    </StyledContainer>
  );
};

export default CreatePostScreen;

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

  input,
  input:focus,
  input:active {
    border: none;
    outline: none;
  }

  input.title {
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 900;
  }

  input.subtitle {
    font-size: 1.5rem;
    font-weight: 100;
    font-style: italic;
  }
`;
