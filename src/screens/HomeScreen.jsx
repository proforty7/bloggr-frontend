import React from "react";
import styled from "styled-components";
import { Column } from "../components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const HomeScreen = () => {
  return (
    <StyledContainer>
      <Column>
        <StyledNavbar>
          <div className="logo">
            <img src={require("../assets/logo.png")} alt="logo" width="64" />
          </div>
          <StyledLink to="#about" className="nav-item" id="about">
            About
          </StyledLink>
          <StyledLink to="/signin" className="nav-item" id="signin">
            Signin
          </StyledLink>
          <StyledLink to="/signup" className="nav-item" id="signup">
            Signup
          </StyledLink>
        </StyledNavbar>
        <StyledContent>
          <h1>CREATE YOUR EXPERIENCE AND ENGAGE WITH YOUR DREAM AUDIENCE</h1>
          <Button>Get Started</Button>
        </StyledContent>
      </Column>
    </StyledContainer>
  );
};

export default HomeScreen;

const StyledContainer = styled.div`
  height: 100vh;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${require("../assets/hero-bg.jpg")});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavbar = styled.nav`
  padding-top: 20px;
  position: fixed;
  top: 0;
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 8fr auto auto auto;
  grid-gap: 2em;
  align-items: center;
  text-align: right;

  .nav-item {
    /* margin-left: 20px; */
    text-transform: uppercase;
    font-weight: bold;
  }

  .logo {
    grid-column: 1 / 2;
  }

  #about {
    grid-column: 3 / 4;
  }

  #signin {
    grid-column: 4 / 5;
  }

  #signup {
    grid-column: 5 / 6;
  }
`;

const StyledContent = styled.div`
  text-align: center;

  h1 {
    margin: 0;
    font-weight: bold;
    font-size: 3em;
  }

  Button {
    margin-top: 2em;
  }
`;

const StyledLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: #000;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #27ae60;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover::before {
    visibility: visible;
    width: 100%;
  }
`;
