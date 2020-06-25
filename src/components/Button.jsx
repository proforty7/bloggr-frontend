import React from "react";
import styled, { css, keyframes } from "styled-components";

const Button = ({ children, loading, ...props }) => {
  return (
    <StyledButton loading={loading} {...props}>
      {loading ? (
        <img
          src={require("../assets/spinner.png")}
          alt="spinner"
          height="24px"
        />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;

const spinningAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledButton = styled.button`
  position: relative;
  background-color: #27ae60;
  color: #fff;
  border: 0;
  outline: none;
  text-transform: uppercase;
  font-size: 24px;
  font-family: "Poppins";
  padding: 0.6em 2.5em;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 5px;
    bottom: 0;
    left: 0;
    background-color: #bdffd9;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover::before {
    visibility: visible;
    width: 100%;
  }

  ${(props) =>
    props.loading &&
    css`
      img {
        animation: ${spinningAnimation} 2s linear infinite;
      }
    `}
`;
