import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: left;
    flex-flow: row wrap;
    align-items: center;

    div {
       flex: 1;

        input {
            padding: 0 20px;
            height: 48px;
            border: 1px solid #DDD;
            border-radius: 4px;
        }
        
    }
`;
