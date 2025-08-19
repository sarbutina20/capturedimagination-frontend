export const validacijaPrijava = (podaci) => {

  let errorPoruke = [];
  const provjeraPostojanja = podaci.KorisnickoIme && podaci.Lozinka;
  if (!provjeraPostojanja) {
    errorPoruke.push("Korisničko ime i lozinka su obavezni podaci");
  } else {
    const provjeraIspunjenosti =
      podaci.KorisnickoIme.trim() !== "" && podaci.Lozinka.trim() !== "";
    if (!provjeraIspunjenosti) {
      errorPoruke.push("Korisničko ime i lozinka su obavezni podaci");
    }
    const sqlZastita = podaci.KorisnickoIme.includes("'") || podaci.Lozinka.includes("'");
    if (sqlZastita) {
      errorPoruke.push("Ulazni parametri ne sviju sadržavati znak '");
    }
    const provjeraKolicineZnakova =
      podaci.KorisnickoIme.length >= 6 &&
      podaci.Lozinka.length >= 6 &&
      podaci.KorisnickoIme.length <= 100 &&
      podaci.Lozinka.length <= 100;
    if (!provjeraKolicineZnakova) {
      errorPoruke.push(
        "Korisničko ime i lozinka moraju biti duljine između 6 i 100 znakova"
      );
    }

    const provjeraLozinke =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,100}$/.test(
        podaci.Lozinka
      );
    if (!provjeraLozinke) {
      errorPoruke.push(
        "Lozinka mora sadržavati barem jedno malo slovo, jedno veliko slovo, jedan broj i jedan specijalni znak"
      );
    }

    const provjeraTipa =
      typeof podaci.KorisnickoIme === "string" &&
      typeof podaci.Lozinka === "string";
    if (!provjeraTipa) {
      errorPoruke.push(
        "Korisničko ime i lozinka moraju biti niz znakovnih vrijednosti"
      );
    }
  }

  if (errorPoruke.length > 0) return errorPoruke;
  else return null;
};

export const validacijaRegistracija = (podaci) => {
  let errorPoruke = [];
  const provjeraPostojanja =
    podaci.KorisnickoIme && podaci.Lozinka && podaci.Email;
  if (!provjeraPostojanja) {
    errorPoruke.push("Korisničko ime, lozinka i email su obavezni podaci");
  } else {
    const provjeraIspunjenosti =
      podaci.KorisnickoIme.trim() !== "" &&
      podaci.Lozinka.trim() !== "" &&
      podaci.Email.trim() !== "";
    if (!provjeraIspunjenosti) {
      errorPoruke.push("Korisničko ime i lozinka su obavezni podaci");
    }
    const sqlZastita = podaci.KorisnickoIme.includes("'") || podaci.Lozinka.includes("'") || podaci.Email.includes("'");
    if (sqlZastita) {
      errorPoruke.push("Ulazni parametri ne sviju sadržavati znak '");
    }
    const provjeraKolicineZnakova =
      podaci.KorisnickoIme.length >= 6 &&
      podaci.Lozinka.length >= 6 &&
      podaci.KorisnickoIme.length <= 100 &&
      podaci.Lozinka.length <= 100 &&
      podaci.Email.includes("@");
    if (!provjeraKolicineZnakova) {
      errorPoruke.push(
        "Korisničko ime i lozinka moraju biti duljine između 6 i 100 znakova, dok email mora sadržavati @"
      );
    }

    const provjeraLozinke =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,100}$/.test(
        podaci.Lozinka
      );

    if (!provjeraLozinke) {
      errorPoruke.push(
        "Lozinka mora sadržavati barem jedno malo slovo, jedno veliko slovo, jedan broj i jedan specijalni znak"
      );
    }

    const provjeraTipa =
      typeof podaci.KorisnickoIme === "string" &&
      typeof podaci.Lozinka === "string" &&
      typeof podaci.Email === "string";

    if (!provjeraTipa) {
      errorPoruke.push(
        "Korisničko ime, lozinka i email moraju biti niz znakovnih vrijednosti"
      );
    }
  }

  if (errorPoruke.length > 0) return errorPoruke;
  else return null;
};

export const validacijaStavkiNarudzbe = (stavke) => {
  if (stavke.length === 0) {
    throw new Error("Narudžba mora sadržavati barem jednu stavku");
  }

  const validneStavke = stavke.map((stavka) => {
    const provjeraPostojanja =
      stavka.isbn &&
      stavka.autor &&
      stavka.naslov &&
      stavka.cijena &&
      stavka.kolicina;
    if (provjeraPostojanja) {
      const provjeraIspunjenosti =
        stavka.isbn.trim() !== "" &&
        stavka.autor.trim() !== "" &&
        stavka.naslov.trim() !== "" &&
        stavka.cijena > 0 &&
        stavka.kolicina > 0;
      if (provjeraIspunjenosti) {
        const sqlZastita = stavka.isbn.includes("'") || stavka.autor.includes("'") || stavka.naslov.includes("'");
        const provjeraTipa =
          typeof stavka.isbn === "string" &&
          typeof stavka.autor === "string" &&
          typeof stavka.naslov === "string" &&
          typeof stavka.cijena === "number" &&
          typeof stavka.kolicina === "number";
        if (provjeraTipa && !sqlZastita) {
          return true;
        }
      }
    }
    return false;
  });
  if (!validneStavke) {
    throw new Error("Narudžba sadrži neispravne stavke");
  } else {
    return true;
  }
};
