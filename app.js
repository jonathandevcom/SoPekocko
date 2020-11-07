///// Ajout des modules dont nous avons besoins
const express = require('express'); 
const app = express(); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const path = require('path');
const helmet = require("helmet");
require('dotenv').config()

///// Connexion à MongoDb
mongoose.connect(process.env.LIEN_MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

///// Accès control pour éviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

app.use(bodyParser.json());

///// Enregistrement des routeurs
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;