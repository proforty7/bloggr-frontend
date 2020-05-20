import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const DashboardScreen = () => {
  return (
    <StyledContainer>
      <Navbar />
      <div>nice</div>
    </StyledContainer>
  );
};

export default DashboardScreen;

const StyledContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(39, 174, 96, 0.29),
      rgba(39, 174, 96, 0.29)
    ),
    url(${require("../assets/dashboard-bg.jpg")});
  background-size: cover;
`;
