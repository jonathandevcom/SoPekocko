///// Création d'un schema pour les objets "sauces"
const mongoose = require('mongoose');

///// schema des objets
const sauceSchema = mongoose.Schema({
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    usersLiked: { type: [String], required: true},
    usersDisliked: { type: [String], required: true},
});

module.exports = mongoose.model('Sauce', sauceSchema);