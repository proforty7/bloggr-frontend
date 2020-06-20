import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Card, Column } from "../components";
import Button from "../components/Button";
import { Form, Formik } from "formik";
import { privateApi } from "../api";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import MyEditor from "../components/Editor";
import { toast } from "react-toastify";

const CreatePostScreen = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("bloggrToken");
  const [content, setContent] = React.useState("");

  const postValidator = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    subtitle: Yup.string(),
    content: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const { title, subtitle } = values;
    setLoading(true);
    try {
      await privateApi(token).post("/posts", {
        title,
        subtitle,
        content,
      });
      toast.success("Published!");
      history.goBack();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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
                        name="title"
                        onChange={handleChange}
                      />
                      <input
                        className="subtitle"
                        placeholder="Subtitle"
                        type="text"
                        name="subtitle"
                        onChange={handleChange}
                      />
                      <MyEditor content={content} setContent={setContent} />
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

const StyledBlogContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled.div`
  padding: 2em;

  > h1 {
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
