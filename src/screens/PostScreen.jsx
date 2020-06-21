import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Navbar from "../components/Navbar";
import { Column } from "../components";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import NoBlog from "../components/NoBlog";
import { privateApi } from "../api";
import { useState } from "react";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const PostScreen = () => {
  const match = useRouteMatch();
  const token = useSelector((state) => state.auth.token);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const { postId } = match.params;
          const res = await privateApi(token).get(`/posts/${postId}`);
          setPost(res.data.post);
        } catch (err) {
          toast.error("Something went wrong");
        }
      }
    };

    fetchData();
  }, [token, match.params]);

  return (
    <StyledContainer>
      <Navbar />
      <Column
        style={{
          boxSizing: "border-box",
          backgroundColor: "#fff",
          minHeight: "calc(100vh - 64px)",
          padding: "2rem",
          width: "100%",
          textAlign: "center",
          wordWrap: "break-word",
          overflow: "scroll",
        }}
      >
        {post ? (
          <>
            <StyledTitle>{post.title}</StyledTitle>
            <StyledSubtitle>{post.subtitle}</StyledSubtitle>
            <StyledHTML>{parse(post.content)}</StyledHTML>
          </>
        ) : (
          <div>Loading</div>
        )}
      </Column>
    </StyledContainer>
  );
};

export default PostScreen;

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

const StyledTitle = styled.h1`
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-size: 4rem;
`;
const StyledSubtitle = styled.p``;
const StyledHTML = styled.p``;
