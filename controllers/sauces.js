const Sauces = require('../models/sauces');
const fs = require('fs');

///// Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

///// Lecture d'une sauce avec son Id
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then((sauce) => { res.status(200).json(sauce); }
  ).catch((error) => { res.status(404).json({ error: error }) });
};

///// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

///// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

///// Affichage de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  Sauces.find()
    .then((sauce) => { res.status(200).json(sauce); })
    .catch((error) => { res.status(400).json({ error: error }) });
};
/*
exports.like = (req,res, next) => {
  Sauces.

}
*/
