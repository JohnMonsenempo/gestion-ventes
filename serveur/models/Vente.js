const mongoose = require("mongoose");

const venteSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  produits: [
    {
      produit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit" },
      quantite: { type: Number, default: 1 },
      prixUnitaire: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Vente", venteSchema);
