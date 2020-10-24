import styled from 'styled-components';

import { MdModeEdit, MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';


export const Card = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px;
  margin: 10px;
  box-shadow: 1px 1px 3px 1px #c3c0c0;
  border-radius: 5px;
  min-width: 300px;
  max-width: 400px;
  min-height: 200px;
  max-height: 200px;
  display: flex;
  flex-flow: row nowrap;
  margin: 5px;
  color: #3a3a3a;
  background-color: #fff;
  cursor: pointer;
  text-align: left;

  &:hover {
    opacity: 0.7;
  }
`;

export const NomeColaborador = styled.label`
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
  margin-top: 10px;
  flex: 1;
`;

export const CargoColaborador = styled.label`
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  flex: 1;
`;

export const TimeColaborador = styled.label`
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  flex: 1;
`;

export const DivActions = styled.div`
  width: 100%;
`;

export const LeftContent = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;

export const RightContent = styled.div`
    flex:2;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-flow: column nowrap;
    padding: 5px 10px;
`;


export const IconeEditColaborador = styled(MdModeEdit)`
  float: right;
  border: solid 1px white;
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
  }
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

export const IconeDeleteColaborador = styled(MdDelete)`
  float: right;
  border: solid 1px white;
  padding: 3px;
  border-radius: 2px;
  margin-left:2px;
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
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
    padding: 5%;
  }
`;


export const Foto = styled.img`
    width: 100px;
    flex: 1;
`;

