const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  // quantite n'est plus required, valeur par défaut = 0
  quantite: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("Produit", produitSchema);
