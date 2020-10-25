import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
    align-items: center;
    padding: 20px 10%;

    .divVerMais {
        width: 100%;
        text-align: center;
        margin-top: 10px;

        button {
            padding: 10px;
            font-size: 18px;
            font-weight: bold;
        }
    }
`;

export const ContainerBusca = styled.div`
    width: 100%; 
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    align-items: center;

    
`;
