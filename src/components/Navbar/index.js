import React, { Component } from 'react';

import { StyledNavbar, NavLink, StyledTitle, CustomNav } from './styles';

import { MdMenu } from 'react-icons/md';

import { logout } from '../../services/auth';


export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    handleLogout() {
        logout();
    }


    render() {
        return (
            <StyledNavbar collapseOnSelect expand="md" variant="dark" >
                <StyledNavbar.Toggle aria-controls="responsive-navbar-nav" >
                    <span className="navbar-toggler-icon">
                        <MdMenu size={28} />
                    </span>
                </StyledNavbar.Toggle>
                <StyledNavbar.Brand>
                    <StyledTitle>Colaboradores</StyledTitle>
                </StyledNavbar.Brand>
                <StyledNavbar.Collapse id="responsive-navbar-nav">
                    <CustomNav>
                        <NavLink to="" onClick={this.handleLogout}>Logout</NavLink>
                    </CustomNav>
                </StyledNavbar.Collapse>
            </StyledNavbar>
        );
    }
}
