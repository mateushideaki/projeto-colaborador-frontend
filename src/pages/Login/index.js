import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import qs from 'querystring';

import api from '../../services/api';
import { login } from '../../services/auth';

import { Container, ContainerLogin, ButtonSubmit, ContainerInput, CustomLabel } from './styles';
import { toast } from 'react-toastify';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '', password: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleKeyPressed = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    }

    handleLogin = () => {
        const { username, password } = this.state;

        if (!username || !password) {
            toast.warn("Preencha o usuário e senha para continuar", { toastId: 'warn-login' });
        } else {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            const auth = { username: 'colaboradorapp', password: 'colaborador#2020' };
            const body = { grant_type: 'password', username, password };

            api.post(
                '/oauth/token',
                qs.stringify(body),
                { auth, headers }
            ).then(response => {
                login(response.data.access_token, response.data.refresh_token);
                this.props.history.push("/colaboradores");
            })
                .catch(erro => {
                    console.log(erro);
                    const loginOuSenhaInvalidos = erro.response && erro.response.data && erro.response.data.error && erro.response.data.error === 'invalid_grant';
                    if (loginOuSenhaInvalidos) {
                        toast.warn('Login e/ou senha inválidos', { toastId: 'warn-login-invalido' });
                    } else {
                        toast.warn('O Servidor não está respondendo', { toastId: 'warn-servidor-offline' });
                    }
                });

        }
    };

    render() {
        return (
            <Container>
                <ContainerLogin>
                    <img src={logo} alt="" />
                    <CustomLabel>Olá novamente!</CustomLabel>
                    <ContainerInput>
                        <label>Usuário:</label>
                        <input type="text" name="username" value={this.state.username} onKeyPress={this.handleKeyPressed} onChange={this.handleInputChange}></input>
                    </ContainerInput>

                    <ContainerInput>
                        <label>Senha:</label>
                        <input type="password" name="password" value={this.state.password} onKeyPress={this.handleKeyPressed} onChange={this.handleInputChange}></input>
                    </ContainerInput>
                    <ButtonSubmit className="mt-4" onClick={this.handleLogin}>Entrar</ButtonSubmit>
                </ContainerLogin>
            </Container >
        )
    }

}