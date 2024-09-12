require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const Joi = require('joi');

const app = express();

let planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const planetSchema = Joi.object({
  name: Joi.string().min(3).required()
});

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });
  res.status(200).json(planet);
});

app.post('/api/planets', (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = {
    id: planets.length + 1,
    name: req.body.name
  };
  planets.push(newPlanet);
  res.status(201).json({ msg: 'Pianeta creato con successo' });
});

app.put('/api/planets/:id', (req, res) => {
  const planet = planets.find(p => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: 'Pianeta non trovato' });

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: 'Pianeta aggiornato con successo' });
});

app.delete('/api/planets/:id', (req, res) => {
  const planetIndex = planets.findIndex(p => p.id === parseInt(req.params.id));
  if (planetIndex === -1) return res.status(404).json({ msg: 'Pianeta non trovato' });

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: 'Pianeta cancellato con successo' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});