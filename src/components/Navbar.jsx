import React from "react";
import styled from "styled-components";
import { StyledLink } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../actions/authActions";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("bloggrToken");
    dispatch(setUser(null));
  };

  return (
    <StyledContainer>
      <img
        src={require("../assets/logo.png")}
        alt="logo"
        height="48px"
        width="48px"
      />
      <div className="nav-menu"></div>
      <div className="nav-right">
        <StyledLink to="/profile">{user.profile.username}</StyledLink>
        <span onClick={handleLogout}>Logout</span>
      </div>
    </StyledContainer>
  );
};

export default Navbar;

const StyledContainer = styled.nav`
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: #e3ffef;
  display: flex;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;

  .nav-menu {
    flex: 1;
  }

  .nav-right {
    span {
      padding: 0.5em 1em;
      cursor: pointer;
      margin-left: 2em;

      &:hover {
        background-color: #27ae60;
        color: #fff;
        transition: all 0.5s ease-in-out;
      }
    }
  }
`;
