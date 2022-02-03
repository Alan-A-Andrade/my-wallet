import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";

import api from "../../services/api";


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
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;

  margin: 0px;
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


function Register() {

  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmedPassword: "" })
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  function handleInputChange(e) {

    setFormData({ ...formData, [e.target.name]: e.target.value })
    setPasswordMatch(true)

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

      console.log(registerForm)

      await api.signUp(registerForm);

      setIsLoading(false);

      navigate("/");

    } catch {

      setIsLoading(false);

      alert('Erro, tente novamente');
      ;
    }
  }


  return (
    <RegisterStyled>
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
        <InputStyled
          type="password"
          placeholder="Senha"
          name="password"
          onChange={(e) => handleInputChange(e)}
          value={formData.password}
          disabled={isLoading}
          required />
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
          disabled={false}>
          Entrar
        </ButtonStyled>
      </form>
      <h1 onClick={() => { navigate("/") }}>
        Já tem uma conta? Entre agora!
      </h1>
    </RegisterStyled >
  )

}

export default Register;