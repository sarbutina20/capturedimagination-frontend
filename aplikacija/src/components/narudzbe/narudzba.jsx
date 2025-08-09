import styles from "./MojeNarudzbe.module.css";

const Narudzba = ({ narudzba }) => {
  const { dan, mjesec, godina, sat, minute } = kreiranjeDatuma(narudzba.datum);

  return (
    <div className={styles.narudzbaContainer}>
      <h2>Stavke narudžbe:</h2>
      {narudzba.stavke.map((stavka) => (
        <ul key={stavka.isbn} className={styles.stavke}>
          <li>
            Naslov knjige: <h1>{stavka.naslov}</h1>
          </li>
          <li>
            ISBN: <h3>{stavka.isbn}</h3>
          </li>
          <li>
            Naručena Količina: <h3>{stavka.kolicina}</h3>
          </li>
        </ul>
      ))}
      <div className={styles.detaljiContainer}>
        <h3>Ukupni iznos narudžbe: ${narudzba.ukupnaCijenaStavki}</h3>
        <h3>
          Datum i vrijeme narudžbe: {dan}.{mjesec}.{godina} {sat}:{minute}
        </h3>
        <h3>
          Adresa dostave: {narudzba.adresa.line1}, {narudzba.adresa.postal_code}{" "}
          {narudzba.adresa.city}
        </h3>
      </div>
    </div>
  );
};

const kreiranjeDatuma = (datum) => {
  const datumObjekt = new Date(datum);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Zagreb",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("hr-HR", options);
  const parts = formatter.formatToParts(datumObjekt);

  const findPart = (type) => parts.find((part) => part.type === type)?.value;

  return {
    dan: findPart("day"),
    mjesec: findPart("month"),
    godina: findPart("year"),
    sat: findPart("hour"),
    minute: findPart("minute"),
  };
};

export default Narudzba;
