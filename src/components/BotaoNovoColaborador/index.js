import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {
    Card,LabelNovo,IconAddColaborador, ContainerInput, ContainerButtons, CustomModal, 
    DivCompetencias, ContainerTopo, ContainerFoto, ContainerDados, CustomInputGroup, DivContatos

} from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';
import StringUtil from '../../util/string-util';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ImageUploader from "react-images-upload";

import {
    MdPhone,
    MdSmartphone,
    MdDomain,
    MdMailOutline,
    MdClose
} from 'react-icons/md';

import {
    FaFacebookF,
    FaLinkedinIn
} from 'react-icons/fa';

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
                endereco: ''
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
    }

    buscarCargos() {
        api.get('/cargos')
            .then(response => {
                this.setState({ cargos: response.data, colaborador: { ...this.state.colaborador, cargo: response.data[0] } });
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
                this.setState({ times: response.data, colaborador: { ...this.state.colaborador, time: response.data[0] } });
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

    handleChangeSelectTipoContato = (event) => {
        this.setState({ tipoContato: event.target.value });
    }

    handleChangeSelectTime = (event) => {
        this.setState({ colaborador: { ...this.state.colaborador, time: { id: event.target.value } } });
    }

    handleChangeSelectCargo = (event) => {
        this.setState({ colaborador: { ...this.state.colaborador, cargo: { id: event.target.value } } });
    }

    handleCadastroColaborador = () => {

        const body = this.state.colaborador;

        api.post('/colaboradores', body)
            .then(response => {
                toast.success('Colaborador cadastrado com sucesso', { toastId: 'success-cadastro-colaborador' });

                const colaboradorRetorno = response;
                const endpoint = '/colaboradores/' + colaboradorRetorno.data.id + '/foto';
                let formData = new FormData();
                if (this.state.image && this.state.image[0]) {
                    formData.append('image', this.state.image[0]);
                    api.post(endpoint, formData)
                        .then(response => {
                            this.setState({
                                colaborador: {
                                    nome: '',
                                    time: {},
                                    cargo: {},
                                    competencias: [],
                                    contatos: [],
                                    endereco: ''
                                }
                            })
                            this.props.carregaLista();
                            console.log(this.props.carregaLista);
                        })
                        .catch(erro => { });
                }


            })
            .catch(erro => {
                if (erro && erro.response && erro.response.data && erro.response.data.errors) {
                    erro.response.data.errors.forEach(erroAtual => {
                        toast.warn(erroAtual.defaultMessage, { toastId: erroAtual.defaultMessage });
                    });
                }
            });

        this.setShowFalse();
    };

    handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            this.handleCadastroColaborador();
        }
    }

    onDrop = (foto, pictureDataURLs) => {
        this.setState({
            image: foto
        });
    }


    removerCompetencia = (index) => {
        let competencias = this.state.colaborador.competencias;
        competencias.splice(index, 1);

        this.setState(
            { colaborador: { ...this.state.colaborador, competencias } }
        );
    }

    removerContato = (index) => {
        let contatos = this.state.colaborador.contatos;
        contatos.splice(index, 1);

        this.setState(
            { colaborador: { ...this.state.colaborador, contatos } }
        );
    }

    getIconePorTipoContato = (tipo) => {
        switch (tipo) {
            case 'Telefone Fixo':
                return <MdPhone size={18} />;
            case 'Telefone Celular':
                return <MdSmartphone size={18} />
            case 'Telefone Empresa':
                return <MdDomain size={18} />
            case 'Email':
                return <MdMailOutline size={18} />
            case 'Facebook':
                return <FaFacebookF size={18} />
            case 'Linked-in':
                return <FaLinkedinIn size={18} />
            default:
                return '';
        }
    }

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
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText="Escolha uma foto"
                                        onChange={this.onDrop}
                                        imgExtension={[".jpg", ".png"]}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                    />
                                </ContainerFoto>
                                <ContainerDados>
                                    <input type="text" placeholder="Nome do colaborador" name="nome" value={this.state.colaborador.nome} onChange={this.handleInputChangeColaborador}></input>
                                    <label>Cargo:</label>
                                    <Form.Control as="select" size="lg" onChange={this.handleChangeSelectCargo.bind(this)}>
                                        {!!(cargos && cargos.length)
                                            && cargos.map(
                                                cargo => <option key={cargo.id} value={cargo.id}>{cargo.nome}</option>
                                            )
                                        }
                                    </Form.Control>
                                    <label>Time:</label>
                                    <Form.Control as="select" size="lg" onChange={this.handleChangeSelectTime.bind(this)}>
                                        {!!(times && times.length)
                                            && times.map(
                                                time => <option key={time.id} value={time.id}>{time.nome}</option>
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
                                        (competencia, index) => <div className="competencia" key={index} onClick={() => this.removerCompetencia(index)}>{competencia}<MdClose size={15} /></div>
                                    )
                                }
                            </DivCompetencias>
                            <label>Contatos:</label>
                            <CustomInputGroup className="mb-3">
                                <CustomInputGroup.Append className="input-add">
                                    <Form.Control as="select" size="lg" onChange={this.handleChangeSelectTipoContato.bind(this)}>
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
                                        (contato, index) => <div className="containerContato" key={index}> {this.getIconePorTipoContato(contato.tipoContato)} <div className="tipoContato">{contato.tipoContato}</div><div className="contato">{contato.contato}</div><MdClose size={15} onClick={() => this.removerContato(index)} /></div>
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
