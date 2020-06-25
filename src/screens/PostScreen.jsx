import React, { useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Column } from "../components";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { publicApi } from "../api";
import { useState } from "react";
import { toast } from "react-toastify";
import parse from "html-react-parser";

const PostScreen = () => {
  const match = useRouteMatch();
  const user = useSelector((state) => state.auth.user);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { postId } = match.params;
        const res = await publicApi().get(`/posts/${postId}`);
        setPost(res.data.post);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, [match.params]);

  return (
    <StyledContainer>
      {user && <Navbar />}
      <Column
        style={{
          boxSizing: "border-box",
          backgroundColor: "#fff",
          minHeight: "calc(100vh - 64px)",
          padding: "2rem",
          width: "100%",
          wordWrap: "break-word",
          overflow: "scroll",
        }}
      >
        {post ? (
          <>
            <StyledTitle>{post.title}</StyledTitle>
            <StyledSubtitle>{post.subtitle}</StyledSubtitle>
            <StyledHTML className="content">{parse(post.content)}</StyledHTML>
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
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
`;
const StyledSubtitle = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
const StyledHTML = styled.div``;
