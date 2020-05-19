import styled from "styled-components";
import { Link } from "react-router-dom";

export const Column = styled.div`
  width: 60%;
  margin: auto;
`;

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`;

export const StyledLink = styled(Link)`
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
