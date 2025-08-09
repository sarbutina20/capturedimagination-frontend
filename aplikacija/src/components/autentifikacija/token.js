import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export function dohvatiToken () {
    const token = Cookies.get('token');
    if(token) return token;
    else return null;
}

export function tokenLoader () {
    return dohvatiToken();
}

export function actionZastita() {
    const token = dohvatiToken()
    if(token) return token;
    else return redirect('/');
}

export function loaderAutentifikacija() {
    const token = dohvatiToken()
    if(token) return redirect('/')
    else return null;
}