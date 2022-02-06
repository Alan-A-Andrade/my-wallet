import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

import { Bars } from "react-loader-spinner";
import Swal from "sweetalert2";

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

.login-error-msg{
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  color: #FFFFFF;

  margin-top: 0px;


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

  const { auth, login } = useAuth()

  const [formData, setFormData] = useState({ email: "", password: "" })

  const [isLoading, setIsLoading] = useState(false);

  const [failedLogin, setFailedLogin] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (auth) {
      navigate("/wallet");
    }
  }, []);

  function handleInputChange(e) {
    setFailedLogin(true)
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

    } catch (error) {

      setIsLoading(false);

      if (error.response.data === "Unauthorized") {
        setFailedLogin(false)
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
        <ButtonStyled
          type="submit"
          disabled={isLoading}>
          {isLoading ? <Bars color="#ffffff" height="32px" /> : "Entrar"}
        </ButtonStyled>
        {
          failedLogin
            ? ""
            : <h1 className="login-error-msg">Usuário/Senha incorreto(s)</h1>
        }
      </form>
      <h1 onClick={() => { navigate("/register") }}>
        Primeira vez? Cadastre-se!
      </h1>
    </LoginStyled >
  )

}

export default Login;