import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";


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

  const [formData, setFormData] = useState({ userName: "", email: "", password: "", confirmedPassword: "" })
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const navigate = useNavigate()

  function handleInputChange(e) {

    setFormData({ ...formData, [e.target.name]: e.target.value })
    setPasswordMatch(true)

  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmedPassword && formData.confirmedPassword !== "") {
      setPasswordMatch(false)
      return
    }

    alert(`nome:${formData.userName} usuario: ${formData.email}, senha: ${formData.password} senha2: ${formData.confirmedPassword}`)
    navigate("/wallet")
  }


  return (
    <RegisterStyled>
      <img src={logoIcon} alt="My Wallet Logo" />
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputStyled
          type="text"
          placeholder="Nome"
          name="userName"
          onChange={(e) => handleInputChange(e)}
          value={formData.userName}
          disabled={false}
          required
        />
        <InputStyled
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => handleInputChange(e)}
          value={formData.email}
          disabled={false}
          required />
        <InputStyled
          type="password"
          placeholder="Senha"
          name="password"
          onChange={(e) => handleInputChange(e)}
          value={formData.password}
          disabled={false}
          required />
        <InputStyled
          type="password"
          placeholder="Confirme a senha"
          name="confirmedPassword"
          onChange={(e) => handleInputChange(e)}
          value={formData.confirmedPassword}
          disabled={false}
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