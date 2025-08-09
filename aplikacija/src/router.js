import UspjesnaTransakcija from "./components/checkout/UspjesnaTransakcija"
import ErrorPage from "./routes/ErrorPage/ErrorPage";
import MainLayout from "./routes/MainLayout";
import { loaderKnjige, PrikazKnjiga } from "./components/knjiga/PrikazKnjiga";
import { Prijava } from "./components/autentifikacija/Prijava";
import { actionOdjava } from "./components/autentifikacija/Odjava";
import { loaderAutentifikacija, tokenLoader } from "./components/autentifikacija/token";
import Registracija, { actionRegistracija } from "./components/autentifikacija/Registracija";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import KnjigaDetalji from "./components/knjiga/KnjigaDetalji/KnjigaDetalji";
import MojeNarudzbe, { loaderNarudzbe } from "./components/narudzbe/MojeNarudzbe";
import { validacijaPrijava } from "./validacija";
import store from "./store/store";
import { postavljanjeStanja } from "./store/cartReducer";
import { postavljanjeFavorita } from "./store/favoritesReducer";
import { toggleAuth } from "./store/UI";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { rootLoader } from "./components/autentifikacija/rootLoader";


export async function prijavaAction({ request }) {
  const podaci = await request.formData();
  const KorisnickoIme = podaci.get("username");
  const Lozinka = podaci.get("password");

  const validacijaPodataka = validacijaPrijava({ KorisnickoIme, Lozinka });
  if (validacijaPodataka) {
    return validacijaPodataka;
  }

  const odgovor = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/prijava`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ KorisnickoIme, Lozinka }),
  });

  if (!odgovor.ok) {
    const vraceniOdgovor = await odgovor.json();
    return [vraceniOdgovor.error];
  }

  const vraceniOdgovor = await odgovor.json();

  const token = vraceniOdgovor.token;
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  Cookies.set("token", token, { expires: expirationDate, path: "/" });

  store.dispatch(toggleAuth());
  if (vraceniOdgovor.kosarica) {
    store.dispatch(postavljanjeStanja(vraceniOdgovor.kosarica));
  }
  if (vraceniOdgovor.favoriti) {
    store.dispatch(postavljanjeFavorita(vraceniOdgovor.favoriti));
  }

  return redirect("/");
}

export const kreirajRouter = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          errorElement: <ErrorPage></ErrorPage>,
          //loader: tokenLoader,
          loader: rootLoader,
          id:'root',
          children: [
            {
              index: true,
              element: <App></App>
            },
            {
              path: "prijava",
              element: <Prijava></Prijava>,
              loader: loaderAutentifikacija,
              action: prijavaAction
            },
            {
              path: "registracija",
              element: <Registracija></Registracija>,
              action: actionRegistracija,
              loader: loaderAutentifikacija
            },
            {
              path: "odjava",
              action: actionOdjava
            },
            {
              path: "knjige",
              element: <PrikazKnjiga></PrikazKnjiga>,
              loader: loaderKnjige,
            },
            {
              path: "knjige/detalji",
              element: <KnjigaDetalji></KnjigaDetalji>,
            },
            {
              path: "mojeNarudzbe",
              element: <MojeNarudzbe></MojeNarudzbe>,
              loader: loaderNarudzbe
            },
            {
              path: "mojeNarudzbe",
              element: <MojeNarudzbe></MojeNarudzbe>,
            },
            {
              path: "uspjesnaTransakcija",
              element: <UspjesnaTransakcija></UspjesnaTransakcija>
            }
          ],
        },
      ]);
      return router; 
}