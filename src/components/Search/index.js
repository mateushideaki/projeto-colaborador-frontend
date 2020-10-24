import React, { Component } from 'react';
import { Container } from './styles';
import { Input, Icon } from 'semantic-ui-react'

export default class Search extends Component {
    render() {
        return (
            <Container>
                <Input icon placeholder='O que você está procurando?'>
                    <input />
                    <Icon name='search' />
                </Input>
            </Container>
        );
    }
}