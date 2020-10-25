import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    align-items: center;
    margin: 20px 20%;

    .divAcoes {
        width: 100%;
        text-align: right;
        svg {
            margin-left: 10px;
            cursor: pointer;
        }
    }

    .informacoesPessoais {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
        margin-top: 25px;
        margin-bottom: 25px;
        border-bottom: 1px solid #a8a8a8;
        padding-bottom: 25px;

        img {
            flex: 1;
            max-width: 150px;
            border: 1px solid #a8a8a8;
            border-radius: 1000px;
            margin-right: 25px;
        }

        .dadosTextuais {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            align-items: left;
            justify-content: center;

            .labelNome {
                flex: 1;
                font-size: 32px;
                font-weight: bold;
                line-height: 40px;
            }
            .labelCargo {
                flex: 1;
                font-size: 18x;
                font-weight: bold;
                color: #727272;
            }
            .labelTime {
                flex: 1;
                font-size: 16px;
                color: #727272;
            }
        }
    }

    .divCompetencias {
        margin-bottom: 25px;
    }

    .divContatos {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        margin-bottom: 25px;

        .containerContato {
            flex: 1;
            min-width: 50%;
            margin-bottom: 15px;
            
            svg {
                display: inline-flex;
                margin-bottom: 5px;
            }

            .contato {
                display: inline-flex;
                margin-left: 5px;
                font-size: 18px;
            }
        }
    }

    .divEndereco {
        width: 100%;

        svg {
            display: inline-flex;
            margin-bottom: 5px;
        }


        label {
            display: inline-flex;
            margin-left: 5px;
            font-size: 18px;
        }
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
    }

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

  .fileContainer {
    max-width: 90%;
    padding: 0px 0px;
  }

  .uploadPictureContainer {
    width: 100%;
  }

  .deleteImage {
    display: none;
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
  width: 100%;

  .competencia {
      padding: 10px 20px;
      margin: 5px;
      box-shadow: 2px 2px 3px 1px #c3c0c0;  
      cursor: pointer;
      font-size: 16px;
      svg {
        margin-bottom: 10px;
        margin-left: 10px;
      }
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

  svg {
    margin: 13px 0px 0px 5px;
    cursor: pointer;
  }
  
`;


