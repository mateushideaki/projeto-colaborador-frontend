import styled from 'styled-components';

import { MdAddCircle } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

export const Card = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px;
  margin: 10px;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: 5px;
  min-width: 175px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-flow: column;
  margin: 5px;
  color: #3a3a3a;
  background-color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const LabelNovo = styled.label`
  font-size: 15px;
  margin-bottom: 0px;
  cursor: pointer;
`;

export const IconAddColaborador = styled(MdAddCircle)`
  margin-right: 5px;
`;

export const ContainerInput = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-flow: column wrap;

    label {
      margin-top: 10px;
      font-size: 16px;
      color: #737373;
    };

    input {
        width: 100%;
        margin-top: 10px;
        padding: 0 20px;
        height: 48px;
        border: 1px solid #DDD;
        border-radius: 4px;
    }

`;

export const ContainerButtons = styled.div`
margin-top: 10px;
  width: 100%;
  display: flex;

  button {
    flex:1;
    margin:2px;
  }
`;

export const CustomModal = styled(Modal)`
  .modal-content {
    padding: 3%;
  }

  .modal-body {
    padding: 1%;
  }

  select {
    font-size: 14px;
  }
`;

export const ContainerTopo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
`;

export const ContainerFoto = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  min-width: 150px;
  max-width: 150px;

  div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .labelUpload {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  
  .labelEscolherFoto {
      position: absolute;
      top: 30%;
      left: 15%;
  }

  input {
    display:none
  }

  img{
    max-width: 90%;
  }
`;

export const ContainerDados = styled.div`
  flex: 3;
  display: flex;
  align-items: flex-start;
  flex-flow: column wrap;
`;

export const CustomInputGroup = styled(InputGroup)`

  display: flex;
  flex-flow: row wrap;
  width: 100%;

  .input-add {
    flex: 2;
  }

  .btn-add {
    flex: 1;
    text-decoration: none;
  }

  .input-add2 {
    flex: 4;
  }

  .btn-add2 {
    flex: 1;
  }

  input {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    height: 48px;
    border: 1px solid #DDD;
    border-radius: 0px;
  }

  select {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    height: 48px;
    border: 1px solid #DDD;
    border-radius: 0px;
  }

  .btn-outline-success {
    width: 100%;
    margin-top: 10px;
    padding: 0 20px;
    height: 48px;
    border: 1px solid #DDD;
    border-radius: 4px;
    text-decoration: none;
  }

  button:focus, input:focus {
    box-shadow: none !important;
  }

`;


export const DivCompetencias = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;

  .competencia {
      padding: 5px;
      margin: 5px;
      box-shadow: 2px 2px 3px 1px#c3c0c0;  
    }
`;

export const DivContatos = styled.div`
  width: 100%;
  
  
  .containerContato {
    display: flex;
    align-items: flex-start;
    flex-flow: row wrap;
    width: 100%;
    padding: 5px;
    border: 1px solid #DDD;
  }

  .tipoContato {
    flex: 1;
    padding: 5px;
    margin: 5px;
    padding: 5px;
    border: 1px solid #DDD;
    border-radius: 5px;

  }

  .contato {
    flex: 1;
    padding: 5px;
    margin: 5px;
    padding: 5px;
    border: 1px solid #DDD;
    border-radius: 5px;

  }
`;

