import Cookies from "js-cookie";

export const actionOdjava = () => {
    Cookies.remove('token');
    window.location.href = '/';
}