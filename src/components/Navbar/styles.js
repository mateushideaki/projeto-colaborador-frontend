import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar'

import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';


export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    align-items: center;
`;

export const StyledTitle = styled.label`
   margin-right: 5px;
   margin-left: 5px;
`;

export const StyledNavbar = styled(Navbar)`
    color: white!important;
    background-color: #1b90cd!important;

    a {
        color: #ececec!important;
    }

    a.nav-link {
        padding: 0.5rem 1rem;
    }

    a.nav-item {
        color: #9e9e9e!important;
    }

    a.navbar-brand {
        color: white!important;
    }

    button {
        border-color: white!important;
        color: white!important;

        span {
            color: white;
            background-image: none!important;
            cursor: pointer;
        }
        
    }

`;

export const CustomLink = styled(Link)`
    display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    text-align: inherit;
    white-space: nowrap;
    color: #9e9e9e!important;
    background-color: white!important;
    border: 0;

    &:hover {
        opacity: 0.7;
    }
`;

export const CustomNav = styled(Nav)`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`;

export const NavLink = styled(Link)`
    padding: 0.5rem 1rem;
    width: fit-content;
`;