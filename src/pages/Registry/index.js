import logoIcon from "../../assets/MyWallet.svg"

import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputStyled from "../../components/formComponents/input";
import ButtonStyled from "../../components/formComponents/button";
import TitleStyled from "../../components/title";

import useRegistryType from "../../hooks/useRegistryType";
import CurrencyInput from 'react-currency-input-field';

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const RegistryStyled = styled.div`

width: 100%;
height: 100%;

display: flex;
align-items: flex-start;
flex-direction: column;

form{

display: inline-block;
flex-direction: column;
margin-top: 40px;

& >* {
  margin: 7px 0px ;

}
}

#input-currencly{

  width: 100%;
  height: 58px;

  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;

  padding: 15px;

  border-radius: 5px;
  border: hidden;
}


`;


function Registry() {

  const [formData, setFormData] = useState({ value: "", description: "" })

  const { auth } = useAuth()

  const navigate = useNavigate()

  const { registryType } = useRegistryType()


  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleCustomInputValueChance(value, name) {

    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.postRegistry({ ...formData, type: registryType }, auth)
      navigate("/wallet");
    }
    catch {
      alert(`Um erro ocorreu`)
    }
  }


  return (
    <RegistryStyled>
      <TitleStyled>
        {registryType === "surplus"
          ? "Nova entrada"
          : "Nova saída"
        }
      </TitleStyled>
      <form onSubmit={(e) => handleSubmit(e)}>
        <CurrencyInput
          id="input-currencly"
          name="value"
          placeholder="Valor"
          decimalSeparator=","
          groupSeparator="."
          decimalsLimit={2}
          decimalScale={2}
          onValueChange={(value, name) => handleCustomInputValueChance(value, name)} />
        <InputStyled
          type="text"
          placeholder="Descrição"
          name="description"
          onChange={(e) => handleInputChange(e)}
          value={formData.description}
          disabled={false}
          required />
        <ButtonStyled
          type="submit"
          disabled={false}>
          {registryType === "surplus"
            ? "Salvar entrada"
            : "Salvar saída"
          }
        </ButtonStyled>
      </form>
    </RegistryStyled >
  )

}

export default Registry;