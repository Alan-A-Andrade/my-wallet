import styled from "styled-components";

const ButtonStyled = styled.button`
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 5px;
  
  cursor: pointer;
  pointer-events: ${(props) => props.disabled ? "none" : "all"};
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  text-align: center;
  
  background: #A328D6;
  color: #FFFFFF;
`;

export default ButtonStyled;