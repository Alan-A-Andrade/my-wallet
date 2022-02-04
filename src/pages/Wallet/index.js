import styled from "styled-components";

import TitleStyled from "../../components/title";
import RegistryStyled from "../../components/registryButton";
import RegistryInfo from "../../components/RegistryInfo";
import logOffIcon from "../../assets/logoff.svg"
import surplusIcon from "../../assets/plussign.svg"
import deficitIcon from "../../assets/minussign.svg"

import { useNavigate } from "react-router-dom";
import useRegistryType from "../../hooks/useRegistryType";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";

import api from "../../services/api";
import useReload from "../../hooks/useReload";

const WalletStyled = styled.div`

width: 100%;
height: 100%;

display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column;

`;

const Header = styled.header`

width: 100%;

display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;

margin-bottom: 22px;

`;

const Footer = styled.footer`

width: 100%;

display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
gap: 15px;

margin-top: 15px;
`;

const WalletScreen = styled.main`
width: 100%;
height: 100%;

display: flex;
justify-content: space-between;
flex-direction: column;


padding: 0px 12px 10px 12px;

background: #FFFFFF;
border-radius: 5px;

.registries-wrapper{

  overflow-y: scroll;
  max-height: 25em;

  &:first-child{
    padding-top: 23px;
  }
}

`

const NoRegistry = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #868686;
`
const WalletTotal = styled.div`

width: 100%;
display: flex;
align-items: center;
justify-content: space-between;

.total-title{
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 20px;
}

.total-value-display{
  color: ${props =>
    props.type === "surplus"
      ? "#03AC00"
      : "#C70000"
  };
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 20px;
}

`

function Wallet() {

  const { auth, userName, logoff } = useAuth()
  const { reload } = useReload()

  const [userWallet, setUserWallet] = useState([])
  const { setRegistryType } = useRegistryType()
  const navigate = useNavigate()

  function handleRegistryPost(type) {
    setRegistryType(`${type}`)
    navigate("/registry")

  }

  async function handleWallet(token) {
    try {
      const promise = await api.getRegistries(token)

      setUserWallet(promise.data)

    } catch {
      alert("Um erro ocorreu")
    }
  }

  useEffect(() => {
    handleWallet(auth)
  }, reload);


  function auxSum(array) {
    let total = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i].type === "surplus") {
        total += parseFloat(array[i].value.replace(",", '.'));
      }
      else {
        total -= parseFloat(array[i].value.replace(",", '.'));
      }
    }
    let type = "deficit"
    if (total > 0) {
      type = "surplus"
    }

    total = total.toFixed(2).replace(".", ",")
    let obj = {
      total: total,
      type: type
    }
    return obj
  }


  return (
    <WalletStyled>
      <Header>
        <TitleStyled>Olá, {userName}!</TitleStyled>
        <img onClick={() => { logoff(); navigate("/") }} src={logOffIcon} alt="Log out from wallet" />
      </Header>
      <WalletScreen>
        <div className="registries-wrapper">
          {userWallet.length !== 0
            ? userWallet.map((el, id) =>
              <RegistryInfo
                key={id}
                date={el.date}
                value={el.value}
                description={el.description}
                type={el.type}
                id={el._id}
                token={auth} />)
            : <NoRegistry><h1>Não há registros de entrada ou saída</h1></NoRegistry>}
        </div>
        <div className="registries-wrapper">
          {userWallet.length !== 0
            ? <WalletTotal type={auxSum(userWallet).type}>
              <h1 className="total-title">Saldo</h1>
              <h1 className="total-value-display">{auxSum(userWallet).total}</h1>
            </WalletTotal>
            : ""
          }
        </div>
      </WalletScreen>
      <Footer>
        <RegistryStyled onClick={() => handleRegistryPost("surplus")} >
          <img src={surplusIcon} alt="Add surplus registry" />
          <h1>Nova<br />entrada</h1>
        </RegistryStyled>
        <RegistryStyled onClick={() => handleRegistryPost("deficit")}>
          <img src={deficitIcon} alt="Add deficit registry" />
          <h1>Nova<br />saída</h1>
        </RegistryStyled>
      </Footer>
    </WalletStyled >
  )

}

export default Wallet;