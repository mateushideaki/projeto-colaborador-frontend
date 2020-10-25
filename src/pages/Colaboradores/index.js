import React, { Component } from 'react';

import Navbar from '../../components/Navbar';
import CardColaborador from '../../components/CardColaborador';
import BotaoNovoColaborador from '../../components/BotaoNovoColaborador';
import Search from '../../components/Search';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


import { Container, ContainerBusca } from './styles';

import api from '../../services/api';

export default class Colaboradores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colaboradores: [],
            pesquisa: '',
            paginaAtual: 0,
            existemMaisPaginas: false
        }

        this.buscaColaboradores(false);
    }

    handleInputPesquisa = (event) => {
        this.setState({ pesquisa: event.target.value, paginaAtual: 0 }, () => {
            this.buscaColaboradores(false);
        });
    }

    carregaLista = () => {
        this.setState({ pesquisa: '' }, () => {
            this.buscaColaboradores(false);
        });
    }

    verMais = () => {
        let paginaAtual = this.state.paginaAtual;
        this.setState({ paginaAtual: paginaAtual + 1 }, () => {
            this.buscaColaboradores(true);
        });
    }

    buscaColaboradores = (paginacao) => {
        let colaboradores = this.state.colaboradores;
        if (!colaboradores) {
            colaboradores = [];
        }
        let params = '?pagina=' + this.state.paginaAtual;
        params += this.state.pesquisa ? '&nome=' + this.state.pesquisa : '';

        api.get('/colaboradores' + params)
            .then(response => {
                if (paginacao) {
                    colaboradores = colaboradores.concat(response.data.content);
                    this.setState({ colaboradores, existemMaisPaginas: !response.data.last });
                } else {
                    this.setState({ colaboradores: response.data.content, existemMaisPaginas: !response.data.last });
                }
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
                        <Search handleInputChange={this.handleInputPesquisa.bind(this)} />
                        <BotaoNovoColaborador carregaLista={this.carregaLista.bind(this)} />
                    </ContainerBusca>
                    {!!(colaboradores && colaboradores.length)
                        && colaboradores.map(
                            colaborador => <Link key={colaborador.id} to={{pathname: `/colaboradores/${colaborador.id}`}}><CardColaborador colaborador={colaborador} carregaLista={this.carregaLista.bind(this)} /></Link>
                        )
                    }
                    {(this.state.existemMaisPaginas &&
                        <div className="divVerMais"> <Button variant="success" onClick={() => this.verMais()}>Ver mais</Button></div>)
                    }
                </Container >
            </div>
        );
    }
}
