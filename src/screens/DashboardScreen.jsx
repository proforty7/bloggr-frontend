import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import Navbar from "../components/Navbar";
import { Column } from "../components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import NoBlog from "../components/NoBlog";
import { privateApi } from "../api";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardScreen = () => {
  const history = useHistory();
  const token = localStorage.getItem("bloggrToken");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await privateApi(token).get("/posts");
        setPosts(res.data.data.posts);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, [token]);

  const user = useSelector((state) => state.auth.user);
  return (
    <StyledContainer>
      <Navbar />
      <Column>
        {user.profile.blog ? (
          <StyledGrid>
            <StyledCard dashed onClick={() => history.push("/create-post")}>
              <div className="head">Create New</div>
              <div className="btn">+</div>
            </StyledCard>
            {posts.map((post) => (
              <StyledCard>
                <div className="head">{post.title}</div>
                <div className="subtitle">{post.subtitle}</div>
              </StyledCard>
            ))}
          </StyledGrid>
        ) : (
          <NoBlog />
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
