const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

  mongoose.connect('mongodb+srv://ysi:<PASSWORD>@ysinodejscluster.axeiczw.mongodb.net/?retryWrites=true&w=majority&appName=ysiNodeJsCLuster',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// to get all request with Content-Type  application/json, and put it in req.body
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/stuff',stuffRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;