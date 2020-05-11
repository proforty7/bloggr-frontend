import styled from "styled-components";

export const Column = styled.div`
  height: 100%;
  width: 60%;
  margin: auto;
`;

export const Button = styled.button`
  position: relative;
  background-color: #27ae60;
  color: #fff;
  border: 0;
  text-transform: uppercase;
  font-size: 1.5em;
  font-family: "Poppins";
  padding: 0.6em 2.5em;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #fff;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
  }

  &:hover::before {
    visibility: visible;
    width: 100%;
  }
`;

export const Card = styled.div`
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
`;
