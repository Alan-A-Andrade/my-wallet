import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";

import { Bars } from "react-loader-spinner";

import api from "../../services/api";
import Swal from "sweetalert2";


const RegisterStyled = styled.div`

width: 100%;
height: 100%;

display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

img{
  margin-bottom: 24px;
}

form{

display: inline-block;
flex-direction: column;

& >* {
  margin: 7px 0px ;

}


h1{
  font-style: normal;
  font-weight: bolder;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;

  margin: 0px;
}

.password-wrapper-text{
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 5px;

  & h1{
    color: black;
    font-weight: bold;
  }
}
}

h1{
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;

  margin-top: 36px;
}

`;

const ValidPassword = styled.h1`
  font-style: normal;
  font-weight: bolder !important;
  font-size: 14px !important;
  line-height: 18px;
  color: ${props =>
    props.isValid
      ? "#03AC00 !important"
      : "#C70000 !important"
  };

  margin: 0px;


`


function Register() {

  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmedPassword: "" })
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [userDuplicated, setUserDuplicated] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const [regUC, setRegUC] = useState(false)
  const [regLC, setRegLC] = useState(false)
  const [regNum, setRegNum] = useState(false)
  const [regPassWordLength, setRegPassWordLength] = useState(false)
  const [regSC, setRegSC] = useState(false)

  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const navigate = useNavigate()

  function handleInputChange(e) {

    setFormData({ ...formData, [e.target.name]: e.target.value })

    setPasswordMatch(true)

    setUserDuplicated(true)


  }

  const regexUpperCase = /[A-Z]/
  const regexLowerCase = /[a-z]/
  const regexNumber = /[.*\d]/
  const regexNoWhiteSpace = /[\s]/
  const regexPasswordLength = /^.{8,16}$/
  const regexSpecialChar = /[^\w\d\s:]/

  function checkRegex() {
    setRegUC(regexUpperCase.test(formData.password))
    setRegLC(regexLowerCase.test(formData.password))
    setRegNum(regexNumber.test(formData.password))
    setRegPassWordLength((regexPasswordLength.test(formData.password) && !regexNoWhiteSpace.test(formData.password)))
    setRegSC(regexSpecialChar.test(formData.password))
  }


  async function handleSubmit(e) {

    e.preventDefault();

    if (formData.password !== formData.confirmedPassword && formData.confirmedPassword !== "") {

      setPasswordMatch(false)

      return
    }

    setIsLoading(true);
    try {

      let registerForm = { ...formData }

      delete registerForm.confirmedPassword

      await api.signUp(registerForm);

      setIsLoading(false);

      navigate("/");

    } catch (error) {

      console.log(error.response.data);

      if (error.response.data === "Conflict") {
        setUserDuplicated(false)
      }
      else {
        Swal.fire({
          title: 'Desculpa :(',
          text: 'Problema de conexão com servidor',
          background: "#8C11BE",
          color: "#fff"
        }
        )
      }
      setIsLoading(false);

    }
  }


  return (
    <RegisterStyled onKeyUp={checkRegex}>
      <img src={logoIcon} alt="My Wallet Logo" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputStyled
          type="text"
          placeholder="Nome"
          name="username"
          onChange={(e) => handleInputChange(e)}
          value={formData.username}
          disabled={isLoading}
          required
        />
        <InputStyled
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleInputChange(e)}
          value={formData.email}
          disabled={isLoading}
          required />
        {
          userDuplicated
            ? ""
            : <h1>Usuário já cadastrado</h1>
        }
        <InputStyled
          type="password"
          placeholder="Senha"
          name="password"
          onChange={(e) => handleInputChange(e)}
          value={formData.password}
          disabled={isLoading}
          onFocus={onFocus}
          onBlur={onBlur}
          pattern={/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/}
          required />
        {focused
          ? <div className="password-wrapper-text"><h1>Senha precisa ter:{<br />}</h1>
            <ValidPassword isValid={regNum}> • ao menos um número {<br />}</ValidPassword>
            <ValidPassword isValid={regUC}> • ao menos uma letra Maiúscula{<br />}</ValidPassword>
            <ValidPassword isValid={regLC}> • ao menos uma letra minúscula{<br />}</ValidPassword>
            <ValidPassword isValid={regSC}> • ao menos um caractere especial</ValidPassword>
            <ValidPassword isValid={regPassWordLength}> • tamanho entre 8 a 16 caracteres sem espaço</ValidPassword></div>
          : ""}
        <InputStyled
          type="password"
          placeholder="Confirme a senha"
          name="confirmedPassword"
          onChange={(e) => handleInputChange(e)}
          value={formData.confirmedPassword}
          disabled={isLoading}
          required />
        {
          passwordMatch
            ? ""
            : <h1>Senhas não são idênticas</h1>
        }
        <ButtonStyled
          type="submit"
          disabled={isLoading}>
          {isLoading ? <Bars color="#ffffff" height="32px" /> : "Cadastrar"}
        </ButtonStyled>
      </form>
      <h1 onClick={() => { navigate("/") }}>
        Já tem uma conta? Entre agora!
      </h1>
    </RegisterStyled >
  )

}

export default Register;