const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
  });
// Menangani permintaan GET untuk menampilkan data dari file JSON
app.get('/data_json', (req, res) => {
  // Baca data dari file JSON
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.send('Error: ' + err);
    } else {
      const jsonData = JSON.parse(data);
      res.send(jsonData);
    }
  });
});
app.get('/input', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
// Menangani permintaan POST untuk menulis data ke file JSON
app.post('/add', (req, res) => {
  const { nama, alamat, pekerjaan } = req.body;

  // Baca data yang sudah ada
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.send('Error: ' + err);
    } else {
      const jsonData = JSON.parse(data);

      // Tambahkan data baru
      jsonData.push({ nama, alamat, pekerjaan });

      // Tulis data ke file JSON
      fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          res.send('Error: ' + err);
        } else {
          // Setelah data berhasil ditambahkan, tampilkan halaman HTML
          res.redirect('/'); // Gunakan add.html
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
