import styled from "styled-components";

import TitleStyled from "../../components/title";
import RegistryStyled from "../../components/registryButton";
import logOffIcon from "../../assets/logoff.svg"
import surplusIcon from "../../assets/plussign.svg"
import deficitIcon from "../../assets/minussign.svg"

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

background: #FFFFFF;
border-radius: 5px;

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


function Wallet() {

  function handleRegistryPost(type) {

    alert(`Clicou para adicionar um ${type} à Wallet`)
  }

  let userRegistries = []

  return (
    <WalletStyled>
      <Header>
        <TitleStyled>Olá, Fulano!</TitleStyled>
        <img src={logOffIcon} alt="Log out from wallet" />
      </Header>
      <WalletScreen>
        {userRegistries.length !== 0
          ? userRegistries.map((el, id) => <h1>`Entry ${id}`</h1>)
          : <NoRegistry><h1>Não há registros de entrada ou saída</h1></NoRegistry>}
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