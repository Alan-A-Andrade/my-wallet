import styled from "styled-components";
import dayjs from "dayjs";
import api from "../../services/api";
import useReload from "../../hooks/useReload";

const RegistryInfoStyled = styled.div`

width: 100%;

display: flex;
flex-direction:row;
align-items: flex-start;
justify-content: space-between;

padding: 0.5em 0em;

h1{
font-style: normal;
font-weight: normal;
font-size: 16px;
line-height: 19px;
}
.date-display{
color: #C6C6C6;
}

.description-display{
  color: #000000;
}

.value-display{
  color: ${props =>
    props.type === "surplus"
      ? "#03AC00"
      : "#C70000"
  };
}

.delete-button{
  color: #C6C6C6;
}

.wrapper{
  display:flex;
  gap: 10px;
}

`;

function RegistryInfo(props) {

  const { reload, setReload } = useReload()

  async function handleDeleteRegistry(id, token) {

    if (window.confirm("Deseja deletar esse registro?")) {

      try {
        await api.deleteRegistry(id, token)
        setReload([!reload[0]])
      } catch {
        alert("Um erro ocorreu")
      }
    }
    else {
      return
    }
  }

  return (
    <RegistryInfoStyled type={props.type}>
      <div className="wrapper">
        <h1 className="date-display">{dayjs(props.date).format('DD/MM')}</h1>
        <h1 className="description-display">{props.description}</h1>
      </div>
      <div className="wrapper">
        <h1 className="value-display">{props.value}</h1>
        <h1 onClick={() => handleDeleteRegistry(props.id, props.token)} className="delete-button">X</h1>
      </div>
    </RegistryInfoStyled>
  )

}

export default RegistryInfo