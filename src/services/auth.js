import { createHashHistory } from 'history';

const history = createHashHistory();

export const TOKEN_KEY = "TOKEN";
export const REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, refresh) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    history.replace('/login');
};