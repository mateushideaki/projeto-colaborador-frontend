import React, { Component } from 'react';

import Navbar from '../../components/Navbar';
import CardColaborador from '../../components/CardColaborador';
import BotaoNovoColaborador from '../../components/BotaoNovoColaborador';
import Search from '../../components/Search';

import { Container, ContainerBusca } from './styles';

import api from '../../services/api';

export default class Colaboradores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colaboradores: []
        }

        this.buscaColaboradores();
    }

    buscaColaboradores = () => {
        api.get('/colaboradores')
            .then(response => {
                this.setState({ colaboradores: response.data.content });
            })
            .catch(erro => {
                // console.error(erro);
                // console.error("Error response:");
                // console.error(erro.response.data);
                // console.error(erro.response.status);
                // console.error(erro.response.headers);
            });
    }

    render() {
        const { colaboradores } = this.state;
        return (
            <div>
                <Navbar />
                <Container>
                    <ContainerBusca>
                        <Search />
                        <BotaoNovoColaborador />
                    </ContainerBusca>
                    {!!(colaboradores && colaboradores.length)
                        && colaboradores.map(
                            colaborador => <CardColaborador key={colaborador.id} colaborador={colaborador} buscaColaboradores={this.buscaColaboradores} />
                        )
                    }
                </Container >
            </div>
        );
    }
}
