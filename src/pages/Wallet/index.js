import styled from "styled-components";

import TitleStyled from "../../components/title";
import RegistryStyled from "../../components/registryButton";
import logOffIcon from "../../assets/logoff.svg"
import addIcon from "../../assets/plussign.svg"
import removeIcon from "../../assets/minussign.svg"

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

`;

const Footer = styled.footer`

width: 100%;

display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
gap: 15px;

`;


function Wallet() {


  return (
    <WalletStyled>
      <Header>
        <TitleStyled>Olá, Fulano!</TitleStyled>
        <img src={logOffIcon} alt="Log out from wallet" />
      </Header>
      <h1>main</h1>
      <Footer>
        <RegistryStyled>
          <img src={addIcon} alt="Add registry" />
          <h1>Nova<br />entrada</h1>
        </RegistryStyled>
        <RegistryStyled>
          <img src={removeIcon} alt="Delete registry" />
          <h1>Nova<br />saída</h1>
        </RegistryStyled>
      </Footer>
    </WalletStyled >
  )

}

export default Wallet;