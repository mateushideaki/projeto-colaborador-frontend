import styled from 'styled-components';

export const CustomLabel = styled.label`
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #737373;
` 

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    align-items: center;    

    img {
        width: 80%;
        max-width: 300px;
        border-radius: 10px;
        margin-bottom: 15px;
    };

`;

export const ContainerLogin = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    align-items: center;    
    padding:3% 5%;
    box-shadow: 1px 1px 3px 1px#c3c0c0;
`;

export const ButtonSubmit = styled.button`
    height: 48px;
    width: 100%;
    background: ${props => props.backgroundColor ? props.backgroundColor : '#1b90cd'};
    border-radius: 4px;
    font-size: 16px;
    margin-top: 10px;
    color: #FFF;
    font-weight: bold;
    border: 0;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
    }
`;

export const ContainerInput = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-flow: column wrap;

    label {
      margin-top: 10px;
      font-size: 16px;
      color: #737373;
    };

    input {
        width: 100%;
        margin-top: 10px;
        padding: 0 20px;
        height: 48px;
        border: 1px solid #DDD;
        border-radius: 4px;
    }

`;

export const ContainerButtons = styled.div`
margin-top: 10px;
  width: 100%;
  display: flex;

  button {
    flex:1;
    margin:2px;
  }
`;