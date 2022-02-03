import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const LoginStyled = styled.div`

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


function Login() {

  const { auth, userName, login } = useAuth()

  const [formData, setFormData] = useState({ email: "", password: "" })

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const promise = await api.login({ ...formData });

      setIsLoading(false);

      login(promise.data);

      navigate("/wallet");

    } catch {
      ;
      setIsLoading(false);

      alert('Erro, tente novamente');
    };


  }


  return (
    <LoginStyled>
      <img src={logoIcon} alt="My Wallet Logo" />
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <ButtonStyled
          type="submit"
          disabled={false}>
          Entrar
        </ButtonStyled>
      </form>
      <h1 onClick={() => { navigate("/register") }}>
        Primeira vez? Cadastre-se!
      </h1>
    </LoginStyled >
  )

}

export default Login;