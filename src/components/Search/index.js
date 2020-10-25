import React, { Component } from 'react';
import { Container } from './styles';
import { Input, Icon } from 'semantic-ui-react'

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <Container>
                <Input icon placeholder='Digite o nome de um colaborador'  onChange={this.props.handleInputChange}>
                    <input />
                    <Icon name='search' />
                </Input>
            </Container>
        );
    }
}