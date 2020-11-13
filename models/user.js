const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

///// Création du schéma pour l'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

///// Ajout d'un plugin pour éviter plusieurs utilisateurs avec la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
