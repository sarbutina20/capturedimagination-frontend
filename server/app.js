const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const port = konfiguracija.port || 5000;

app.use(express.static(path.join(__dirname, '../aplikacija/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../aplikacija/build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});
