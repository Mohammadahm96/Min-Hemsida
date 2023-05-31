const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Check file permissions for cars.json
const filePath = path.join(__dirname, 'cars.json');
fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) {
    console.error(`File permissions error: ${err}`);
  } else {
    console.log('File has appropriate read and write permissions.');
  }
});

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'), {
    headers: {
      'Content-Type': 'text/css',
    },
  });
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'script.js'), {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
});

app.get('/cars', (req, res) => {
  fs.readFile('cars.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/add', (req, res) => {
  const year = req.body.year;
  const make = req.body.make;
  const model = req.body.model;
  const owner = req.body.owner;

  const newCar = {
    year: year,
    make: make,
    model: model,
    owner: owner,
  };

  fs.readFile('cars.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const cars = JSON.parse(data);
      cars.push(newCar);

      fs.writeFile('cars.json', JSON.stringify(cars), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('Car added:', newCar);
          res.status(200).send('Car added successfully');
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
