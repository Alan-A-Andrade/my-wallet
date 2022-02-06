import styled from "styled-components";
import dayjs from "dayjs";
import api from "../../services/api";
import useReload from "../../hooks/useReload";

import { useNavigate } from "react-router-dom";
import useRegistryType from "../../hooks/useRegistryType";
import Swal from "sweetalert2";

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

  const { setRegistryType, setRegistryInfo } = useRegistryType()

  const navigate = useNavigate()

  function handleDeleteRegistry(id, token) {

    Swal.fire({
      title: 'Tem certeza?',
      text: "Não será possível reverter!",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua esse registro!',
      background: "#8C11BE",
      color: "#fff"
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          await api.deleteRegistry(id, token)
          setReload([!reload[0]])
        } catch {
          Swal.fire({
            title: 'Desculpa :(',
            text: 'Problema de conexão com servidor',
            background: "#8C11BE",
            color: "#fff"
          }
          )
        }


      }
    })
  }

  function handleEditRegistry() {

    setRegistryType(props.type)
    setRegistryInfo({ value: props.value, description: props.description })
    navigate(`/registry/${props.id}`)
  }

  return (
    <RegistryInfoStyled type={props.type}>
      <div className="wrapper">
        <h1 className="date-display">{dayjs(props.date).format('DD/MM')}</h1>
        <h1 onClick={() => handleEditRegistry()} className="description-display">{props.description}</h1>
      </div>
      <div className="wrapper">
        <h1 className="value-display">{props.value}</h1>
        <h1 onClick={() => handleDeleteRegistry(props.id, props.token)} className="delete-button">X</h1>
      </div>
    </RegistryInfoStyled>
  )

}

export default RegistryInfo