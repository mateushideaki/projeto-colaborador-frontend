import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import {
    Container, ContainerInput, ContainerButtons, CustomModal, DivCompetencias,
    ContainerTopo, ContainerFoto, ContainerDados, CustomInputGroup, DivContatos

} from './styles';
import api from '../../services/api';
import { toast } from 'react-toastify';
import StringUtil from '../../util/string-util';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import ImageUploader from 'react-images-upload';
import avatar from '../../assets/avatar.png';
import Navbar from '../../components/Navbar';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
    MdPhone,
    MdSmartphone,
    MdDomain,
    MdMailOutline,
    MdClose,
    MdArrowBack,
    MdEdit,
    MdDelete,
    MdLocationOn
} from 'react-icons/md';

import {
    FaFacebookF,
    FaLinkedinIn
} from 'react-icons/fa';

export default class Colaborador extends Component {

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
            image: null,
            mostrarConfirmacaoExclusao: false
        }
        this.buscarCargos();
        this.buscarTimes();
        this.buscarTiposContato();
    }

    componentDidMount() {
        this.buscaDadosColaborador();
    }

    buscaDadosColaborador = () => {
        const { idColaborador } = this.props.match.params;

        api.get(`/colaboradores/${idColaborador}`)
            .then(response => {
                this.setState({ colaborador: response.data });
            })
            .catch(erro => {
                let msg = 'Erro ao buscar colaborador';
                if (erro.response.data.message)
                    msg = erro.response.data.message;
                if (!toast.isActive(msg)) {
                    toast.error(msg, { toastId: msg });
                }
                toast.info('Redirecionando para página de colaboradores');

                setTimeout(() => this.props.history.push('/colaboradores'), 3000);
            });
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
        if (event.key === 'Enter') {
            this.adicionarCompetencia();
        }
    }

    handleKeyPressedContato = (event) => {
        if (event.key === 'Enter') {
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
        document.getElementById('competencia').focus();
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

        let colaborador = this.state.colaborador;
        colaborador.foto = null;

        api.put('/colaboradores/' + this.state.colaborador.id, colaborador)
            .then(response => {
                toast.success('Colaborador atualizado com sucesso', { toastId: 'success-atualizar-colaborador' });
                this.buscaDadosColaborador();

                const endpoint = '/colaboradores/' + this.state.colaborador.id + '/foto';
                let formData = new FormData();
                if (this.state.image && this.state.image[0]) {
                    formData.append('image', this.state.image[0]);
                    api.post(endpoint, formData)
                        .then(response => {
                            this.buscaDadosColaborador();
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
        if (event.key === 'Enter') {
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

    getIconePorTipoContato = (tipo, size) => {
        switch (tipo) {
            case 'Telefone Fixo':
                return <MdPhone size={size} />;
            case 'Telefone Celular':
                return <MdSmartphone size={size} />
            case 'Telefone Empresa':
                return <MdDomain size={size} />
            case 'Email':
                return <MdMailOutline size={size} />
            case 'Facebook':
                return <FaFacebookF size={size} />
            case 'Linked-in':
                return <FaLinkedinIn size={size} />
        }
        return '';
    }

    confirmarExclusao = () => {
        this.setState({
            mostrarConfirmacaoExclusao: true
        });
    };

    fecharConfirmacaoExclusao = () => {
        this.setState({
            mostrarConfirmacaoExclusao: false
        });
    }

    voltarParaLista = () => {
        this.props.history.push('/colaboradores')
    }

    excluirColaborador = () => {
        api.delete(`/colaboradores/${this.state.colaborador.id}`)
            .then(response => {
                toast.success('Colaborador excluído com sucesso', { toastId: 'success-excluir-colaborador' });
                toast.info('Redirecionando para página de colaboradores');
                this.fecharConfirmacaoExclusao();
                setTimeout(() => this.props.history.push('/colaboradores'), 500);
            })
            .catch(erro => {
                if (erro.response && erro.response.data) {
                    toast.error(erro.response.data.message, { toastId: 'error-excluir-colaborador' });
                };
            });
    }

    render() {
        const { cargos } = this.state;
        const { tiposContato } = this.state;
        const { times } = this.state;
        const { colaborador } = this.state;
        return (
            <div>
                <Navbar />
                <Container>
                    <div className='divAcoes'>
                        <MdArrowBack size={28} onClick={() => this.voltarParaLista()}/>
                        <MdEdit onClick={this.setShowTrue} size={28} />
                        <MdDelete size={28} onClick={() => this.confirmarExclusao()} />
                    </div>
                    <div className='informacoesPessoais'>
                        {!!(colaborador.foto && colaborador.foto.data) ? <img className='foto' src={`data:image/jpeg;base64,${this.state.colaborador.foto.data}`}></img> : <img src={avatar}></img>}
                        <div className='dadosTextuais'>
                            <label className='labelNome' >{colaborador.nome}</label>
                            <label className='labelCargo' >{colaborador.cargo.nome}</label>
                            <label className='labelTime' >{colaborador.time.nome}</label>
                        </div>
                    </div>
                    <DivCompetencias className='divCompetencias'>
                        {!!(colaborador.competencias && colaborador.competencias.length) && colaborador.competencias.map((competencia, index) => <div className='competencia' key={index}>{competencia}</div>)}
                    </DivCompetencias>
                    <div className='divContatos'>
                        {!!(colaborador && colaborador.contatos)
                            && colaborador.contatos.map(
                                (contato, index) => <div className='containerContato' key={index}> {this.getIconePorTipoContato(contato.tipoContato, 22)} <div className='contato'>{contato.contato}</div></div>
                            )
                        }
                    </div>
                    <div className='divEndereco'>
                        <MdLocationOn size={22} />
                        <label>{colaborador.endereco}</label>
                    </div>
                </Container>
                <SweetAlert
                    show={this.state.mostrarConfirmacaoExclusao}
                    warning
                    showCancel
                    confirmBtnText="Sim, desejo excluir"
                    cancelBtnText="Cancelar"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Esta ação não poderá ser desfeita"
                    onConfirm={() => this.excluirColaborador()}
                    onCancel={() => this.fecharConfirmacaoExclusao()}>
                    Deseja mesmo excluir este colaborador?
                </SweetAlert>
                <CustomModal
                    show={this.state.show}
                    onHide={this.setShowFalse}
                    dialogClassName='modal-90w'
                    size='xl'
                    aria-labelledby='example-custom-modal-styling-title' >
                    <CustomModal.Header closeButton>
                        <CustomModal.Title id='example-custom-modal-styling-title'>
                            Cadastro de Colaborador
                        </CustomModal.Title>
                    </CustomModal.Header>
                    <CustomModal.Body>
                        <ContainerInput>
                            <ContainerTopo>
                                <ContainerFoto>
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Escolha uma foto'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.png']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                        withIcon={false}
                                        withLabel={false}
                                    />
                                </ContainerFoto>
                                <ContainerDados>
                                    <input type='text' placeholder='Nome do colaborador' name='nome' value={this.state.colaborador.nome} onChange={this.handleInputChangeColaborador}></input>
                                    <label>Cargo:</label>
                                    <Form.Control as='select' size='lg' onChange={this.handleChangeSelectCargo.bind(this)}>
                                        {!!(cargos && cargos.length)
                                            && cargos.map(
                                                cargo => <option key={cargo.id} value={cargo.id} selected={colaborador.cargo.id === cargo.id}>{cargo.nome}</option>
                                            )
                                        }
                                    </Form.Control>
                                    <label>Time:</label>
                                    <Form.Control as='select' size='lg' onChange={this.handleChangeSelectTime.bind(this)}>
                                        {!!(times && times.length)
                                            && times.map(
                                                time => <option key={time.id} value={time.id} selected={colaborador.time.id === time.id}>{time.nome}</option>
                                            )
                                        }
                                    </Form.Control>
                                </ContainerDados>
                            </ContainerTopo>
                            <label>Competências:</label>
                            <CustomInputGroup className='mb-3'>
                                <CustomInputGroup.Append className='input-add2'>
                                    <FormControl
                                        id='competencia'
                                        name='competencia'
                                        onKeyPress={this.handleKeyPressedCompetencia}
                                        value={this.state.competencia}
                                        onChange={this.handleInputChange}
                                        placeholder='Insira uma competência'
                                        aria-label='Insira uma competência'
                                        aria-describedby='basic-addon2'
                                    />
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className='btn-add2'>
                                    <Button variant='outline-success' onClick={this.adicionarCompetencia}>Add</Button>
                                </CustomInputGroup.Append>
                            </CustomInputGroup>
                            <DivCompetencias>
                                {!!(colaborador && colaborador.competencias)
                                    && colaborador.competencias.map(
                                        (competencia, index) => <div className='competencia' key={index} onClick={() => this.removerCompetencia(index)}>{competencia}<MdClose size={15} /></div>
                                    )
                                }
                            </DivCompetencias>
                            <label>Contatos:</label>
                            <CustomInputGroup className='mb-3'>
                                <CustomInputGroup.Append className='input-add'>
                                    <Form.Control as='select' size='lg' onChange={this.handleChangeSelectTipoContato.bind(this)}>
                                        {!!(tiposContato && tiposContato.length)
                                            && tiposContato.map(
                                                tipoContato => <option key={tipoContato}>{tipoContato}</option>
                                            )
                                        }
                                    </Form.Control>
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className='input-add'>
                                    <FormControl
                                        name='contato'
                                        onKeyPress={this.handleKeyPressedContato}
                                        value={this.state.contato}
                                        onChange={this.handleInputChange}
                                        placeholder='Insira o contato'
                                        aria-label='Insira o contato'
                                        aria-describedby='basic-addon2'
                                    />
                                </CustomInputGroup.Append>
                                <CustomInputGroup.Append className='btn-add'>
                                    <Button variant='outline-success' onClick={this.adicionarContato}>Add</Button>
                                </CustomInputGroup.Append>
                            </CustomInputGroup>
                            <DivContatos>
                                {!!(colaborador && colaborador.contatos)
                                    && colaborador.contatos.map(
                                        (contato, index) => <div className='containerContato' key={index}> {this.getIconePorTipoContato(contato.tipoContato, 18)} <div className='tipoContato'>{contato.tipoContato}</div><div className='contato'>{contato.contato}</div><MdClose size={15} onClick={() => this.removerContato(index)} /></div>
                                    )
                                }
                            </DivContatos>
                            <label>Endereço:</label>
                            <input type='text' placeholder='Insira o endereço' name='endereco' value={this.state.colaborador.endereco} onChange={this.handleInputChangeColaborador}></input>
                        </ContainerInput>
                        <ContainerButtons>
                            <Button variant='success' onClick={this.handleCadastroColaborador}>Salvar</Button>
                            <Button variant='light' onClick={this.setShowFalse}>Cancelar</Button>
                        </ContainerButtons>
                    </CustomModal.Body>
                </CustomModal>
            </div>
        );
    }
}
