import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {
    ContainerInput, ContainerButtons, CustomModal, DivCompetencias,
    ContainerTopo, ContainerFoto, ContainerDados, CustomInputGroup, DivContatos

} from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';
import StringUtil from '../../util/string-util';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import avatar from '../../assets/avatar.png';

import {
    Card,
    LabelNovo,
    IconAddColaborador,
} from './styles';

export default class BotaoNovoColaborador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            colaborador: {
                nome: '',
                time: {},
                cargo: {},
                competencias: [],
                contatos: [],
            },
            tiposContato: [],
            times: [],
            cargos: [],
            competencia: '',
            contato: '',
            tipoContato: '',
            image: null
        }
        this.buscarCargos();
        this.buscarTimes();
        this.buscarTiposContato();
        this.onImageChange = this.onImageChange.bind(this);
    }

    buscarCargos() {
        api.get('/cargos')
            .then(response => {
                this.setState({ cargos: response.data, colaborador: { ... this.state.colaborador, cargo: response.data[0] } });
            })
            .catch(erro => {

            });
    }

    buscarTiposContato() {
        api.get('/colaboradores/tiposContato')
            .then(response => {
                this.setState({ tiposContato: response.data, tipoContato: response.data[0] });
            })
            .catch(erro => {

            });
    }

    buscarTimes() {
        api.get('/times')
            .then(response => {
                this.setState({ times: response.data, colaborador: { ... this.state.colaborador, time: response.data[0] } });
            })
            .catch(erro => {

            });
    }

    handleInputChangeColaborador = (event) => {
        this.setState({
            colaborador: {
                ...this.state.colaborador,
                [event.target.name]: StringUtil.capitalizeFirstLetter(event.target.value)
            }
        });
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    setShowTrue = () => {
        this.setState({ show: true });
    }

    setShowFalse = () => {
        this.setState({ show: false });
    }

    handleKeyPressedCompetencia = (event) => {
        if (event.key === "Enter") {
            this.adicionarCompetencia();
        }
    }

    handleKeyPressedContato = (event) => {
        if (event.key === "Enter") {
            this.adicionarContato();
        }
    }

    adicionarCompetencia = () => {
        if (!this.state.competencia || this.state.competencia === '') {
            toast.warn('Insira a competência', { toastId: 'warn-add-competencia' });
            return;
        }

        let competencias = this.state.colaborador.competencias;
        if (!competencias) {
            competencias = [];
        }

        competencias.push(StringUtil.capitalizeFirstLetter(this.state.competencia))

        this.setState({ competencia: '', colaborador: { ...this.state.colaborador, competencias } });
        document.getElementById("competencia").focus();
    }

    adicionarContato = () => {
        if (!this.state.contato || this.state.contato === '') {
            toast.warn('Insira o contato', { toastId: 'warn-add-contato' });
            return;
        }

        let contatos = this.state.colaborador.contatos;
        if (!contatos) {
            contatos = [];
        }

        contatos.push({ tipoContato: this.state.tipoContato, contato: this.state.contato });

        this.setState({ contato: '', colaborador: { ...this.state.colaborador, contatos } });
    }

    handleChangeSelect = (event, propriedade) => {
        this.setState({ [propriedade]: event.target.value });
    }

    handleChangeSelectColaborador = (event, propriedade) => {
        this.setState({ colaborador: { ...this.state.colaborador, [propriedade]: event.target.value } });
    }

    handleCadastroColaborador = () => {

        const body = this.state.colaborador;

        api.post('/colaboradores', body)
            .then(response => {
                toast.success('Colaborador cadastrado com sucesso', { toastId: 'success-cadastro-colaborador' });
                this.props.buscaColaboradors();
                
            })
            .catch(erro => {
                console.log(erro.response.data);
                if (erro.response.data.errors) {
                    erro.response.data.errors.forEach(erroAtual => {
                        toast.warn(erroAtual.defaultMessage, { toastId: erroAtual.defaultMessage });
                    });
                }
            });
        
        this.setShowFalse();
        this.setState({ colaborador: {} });
    };

    handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            this.handleCadastroColaborador();
        }
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
          console.log(this.state.image);
        }
      };

    render() {
        const { cargos } = this.state;
        const { tiposContato } = this.state;
        const { times } = this.state;
        const { colaborador } = this.state;
        return (
            <div>
                <Card onClick={this.setShowTrue}>
                    <div>
                        <IconAddColaborador size={30} /><LabelNovo >Novo Colaborador</LabelNovo>
                    </div>
                </Card>
                <CustomModal
                    show={this.state.show}
                    onHide={this.setShowFalse}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title" >
                    <CustomModal.Header closeButton>
                        <CustomModal.Title id="example-custom-modal-styling-title">
                            Cadastro de Colaborador
                        </CustomModal.Title>
                    </CustomModal.Header>
                    <CustomModal.Body>
                        <ContainerInput>
                            <ContainerTopo>
                                <ContainerFoto>
                                {!!(colaborador.foto && colaborador.foto.data) ? <img src={`data:image/jpeg;base64,${this.state.colaborador.foto.data}`}></img> : <div><label className="labelUpload" for="upload"><input id="upload" type="file" onChange={this.onImageChange}/><label for="upload" className="labelEscolherFoto">Escolher foto</label><img src={avatar}></img></label></div>}
                                </ContainerFoto>
                                <ContainerDados>
                                    <input type="text" placeholder="Nome do colaborador" name="nome" value={this.state.colaborador.nome} onChange={this.handleInputChangeColaborador}></input>
                                    <label>Cargo:</label>
                                    <Form.Control as="select" size="lg" onChange={() => this.handleChangeSelectColaborador.bind(this, 'cargo')}>
                                        {!!(cargos && cargos.length)
                                            && cargos.map(
                                                cargo => <option key={cargo.id}>{cargo.nome}</option>
                                            )
                                        }
                                    </Form.Control>
                                    <label>Time:</label>
                                    <Form.Control as="select" size="lg" onChange={() => this.handleChangeSelectColaborador.bind(this, 'time')}>
                                        {!!(times && times.length)
                                            && times.map(
                                                time => <option key={time.id}>{time.nome}</option>
                                            )
                                        }
                                    </Form.Control>
                                </ContainerDados>
                            </ContainerTopo>
                            <label>Competências:</label>
                            <CustomInputGroup className="mb-3">
                                <CustomInputGroup.Append className="input-add2">
                                    <FormControl
                                        id="competencia"
                                        name="competencia"
                                        onKeyPress={this.handleKeyPressedCompetencia}
                                        value={this.state.competencia}
                                        onChange={this.handleInputChange}
                                        placeholder="Insira uma competência"
                                        aria-label="Insira uma competência"
                                        aria-describedby="basic-addon2"
                                    />
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className="btn-add2">
                                    <Button variant="outline-success" onClick={this.adicionarCompetencia}>Add</Button>
                                </CustomInputGroup.Append>
                            </CustomInputGroup>
                            <DivCompetencias>
                                {!!(colaborador && colaborador.competencias)
                                    && colaborador.competencias.map(
                                        (competencia, index) => <div className="competencia" key={index}>{competencia}</div>
                                    )
                                }
                            </DivCompetencias>
                            <label>Contatos:</label>
                            <CustomInputGroup className="mb-3">
                                <CustomInputGroup.Append className="input-add">
                                    <Form.Control as="select" size="lg" onChange={() => this.handleChangeSelect.bind(this, 'contato')}>
                                        {!!(tiposContato && tiposContato.length)
                                            && tiposContato.map(
                                                tipoContato => <option key={tipoContato}>{tipoContato}</option>
                                            )
                                        }
                                    </Form.Control>
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className="input-add">
                                    <FormControl
                                        name="contato"
                                        onKeyPress={this.handleKeyPressedContato}
                                        value={this.state.contato}
                                        onChange={this.handleInputChange}
                                        placeholder="Insira o contato"
                                        aria-label="Insira o contato"
                                        aria-describedby="basic-addon2"
                                    />
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className="btn-add">
                                    <Button variant="outline-success" onClick={this.adicionarContato}>Add</Button>
                                </CustomInputGroup.Append>
                            </CustomInputGroup>
                            <DivContatos>
                                {!!(colaborador && colaborador.contatos)
                                    && colaborador.contatos.map(
                                        (contato, index) => <div className="containerContato" key={index}> <div className="tipoContato">{contato.tipoContato}</div><div className="contato">{contato.contato}</div></div>
                                    )
                                }
                            </DivContatos>
                            <label>Endereço:</label>
                            <input type="text" placeholder="Insira o endereço" name="endereco" value={this.state.colaborador.endereco} onChange={this.handleInputChangeColaborador}></input>
                        </ContainerInput>
                        <ContainerButtons>
                            <Button variant="success" onClick={this.handleCadastroColaborador}>Salvar</Button>
                            <Button variant="light" onClick={this.setShowFalse}>Cancelar</Button>
                        </ContainerButtons>
                    </CustomModal.Body>
                </CustomModal>
            </div>
        );
    }
}
