import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { ContainerInput, ContainerButtons, CustomModal, LeftContent, RightContent, CargoColaborador, TimeColaborador, Foto } from './styles';

import avatar from '../../assets/avatar.png';

import api from '../../services/api';
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert';
import StringUtil from '../../util/string-util';


import {
  Card,
  NomeColaborador
} from './styles';


export default class CardColaborador extends Component {

  constructor(props) {
    super(props);

    const colaborador = props.colaborador;

    this.state = {
      colaborador,
      mostrarConfirmacaoExclusao: false,
      mostrarModalEdicao: false
    }

  }

  confirmarExclusao = (event) => {
    event.preventDefault();
    this.setState({
      mostrarConfirmacaoExclusao: true
    });
  };

  fecharConfirmacaoExclusao = () => {
    this.setState({
      mostrarConfirmacaoExclusao: false
    });
  }

  mostrarModalEdicao = (event) => {
    event.preventDefault();
    this.setState({
      mostrarModalEdicao: true
    });
  };

  fecharModalEdicao = () => {
    this.setState({
      mostrarModalEdicao: false
    });
  }

  alterarColaborador = () => {

    if (!this.state.colaborador || !this.state.colaborador.descricao) {
      toast.warn("Preencha o nome da colaborador", { toastId: 'warn-alterar-colaborador' });
    } else {
      api.put('/colaboradors', this.state.colaborador)
        .then(response => {
          toast.success('Colaborador alterada com sucesso', { toastId: 'success-atualizar-colaborador' });
          this.props.buscaColaboradors();
        })
        .catch(erro => {
          if (erro.response && erro.response.data) {
            toast.error(erro.response.data.message, { toastId: 'error-atualizar-colaborador' });
          };
        });
    }

    this.fecharModalEdicao();
  }

  excluirColaborador = () => {
    api.delete(`/colaboradors/${this.state.colaborador.id}`)
      .then(response => {
        toast.success('Colaborador excluída com sucesso', { toastId: 'success-excluir-colaborador' });
        this.props.buscaColaboradors();
      })
      .catch(erro => {
        if (erro.response && erro.response.data) {
          toast.error(erro.response.data.message, { toastId: 'error-excluir-colaborador' });
        };
      });
  }

  handleInputChange = (event) => {
    this.setState({
      colaborador: { ...this.state.colaborador, descricao: StringUtil.capitalizeFirstLetter(event.target.value) }
    });
  }

  handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      this.alterarColaborador();
    }
  }

  render() {
    const { colaborador } = this.state;
    return (
      <div>
        <Card>
          <LeftContent>
            {!!(colaborador.foto && colaborador.foto.data) ? <Foto src={`data:image/jpeg;base64,${this.state.colaborador.foto.data}`}></Foto> : <Foto src={avatar}></Foto>}
          </LeftContent>
          <RightContent>
            <NomeColaborador>{this.state.colaborador.nome}</NomeColaborador>
            <CargoColaborador>{this.state.colaborador.cargo.nome}</CargoColaborador>
            <TimeColaborador>{this.state.colaborador.time.nome}</TimeColaborador>
          </RightContent>
        </Card>
        <SweetAlert
          show={this.state.mostrarConfirmacaoExclusao}
          warning
          showCancel
          confirmBtnText="Sim, quero excluir!"
          cancelBtnText="Pera aí!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Esta ação não poderá ser desfeita"
          onConfirm={() => this.excluirColaborador()}
          onCancel={() => this.fecharConfirmacaoExclusao()}>
          Deseja mesmo excluir esta colaborador?
      </SweetAlert>
        <CustomModal
          show={this.state.mostrarModalEdicao}
          onHide={this.fecharModalEdicao}
          dialogClassName="modal-90w"
          size="md"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <CustomModal.Header closeButton>
            <CustomModal.Title id="example-custom-modal-styling-title">
              Cadastro de Colaborador
                </CustomModal.Title>
          </CustomModal.Header>
          <CustomModal.Body>
            <ContainerInput>
              <label>Nome do Colaborador:</label>
              <input type="text" name="nomeColaborador" value={this.state.colaborador.descricao} onKeyPress={this.handleKeyPressed} onChange={this.handleInputChange}></input>
            </ContainerInput>
            <ContainerButtons>
              <Button variant="success" onClick={this.alterarColaborador}>Salvar</Button>
              <Button variant="light" onClick={this.fecharModalEdicao}>Cancelar</Button>
            </ContainerButtons>
          </CustomModal.Body>
        </CustomModal>
      </div>
    );
  }
}
