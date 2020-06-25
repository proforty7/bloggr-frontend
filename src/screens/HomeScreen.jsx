import React from "react";
import styled from "styled-components";
import { Column, StyledLink } from "../components";
import Button from "../components/Button";

const HomeScreen = ({ history }) => {
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
          <StyledLink to={`/signin`} className="nav-item" id="signin">
            Signin
          </StyledLink>
          <StyledLink to={`/signup`} className="nav-item" id="signup">
            Sign up
          </StyledLink>
        </StyledNavbar>
        <StyledContent>
          <h1>CREATE YOUR EXPERIENCE AND ENGAGE WITH YOUR DREAM AUDIENCE</h1>
          <Button onClick={() => history.push("/signin")}>Get Started</Button>
        </StyledContent>
      </Column>
    </StyledContainer>
  );
};

export default HomeScreen;

const StyledContainer = styled.div`
  min-height: 100vh;
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
  display: block;
  padding-top: 20px;
  position: fixed;
  top: 0;
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 8fr auto auto auto;
  grid-gap: 2em;
  align-items: center;
  text-align: right;

  @media only screen and (max-width: 768px) {
    display: none;
  }

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
    font-size: 3rem;

    @media screen and (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  Button {
    margin-top: 2em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
