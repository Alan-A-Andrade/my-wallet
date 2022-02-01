import styled from "styled-components";

const InputStyled = styled.input`

width: 100%;
height: 58px;

font-style: normal;
font-weight: normal;
font-size: 20px;
line-height: 23px;

padding: 15px;

border-radius: 5px;
border: hidden;

pointer-events: ${(props) => props.disabled ? "none" : "all"};
  
  background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
  color: ${(props) => props.disabled ? "#AFAFAF" : "#000000"};

  &::placeholder{
    color: #000000;
  }
`;

export default InputStyled;