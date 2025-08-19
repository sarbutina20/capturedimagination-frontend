import Cookies from "js-";

export const actionOdjava = () => {
    Cookies.remove('token');
    window.location.href = '/';
}