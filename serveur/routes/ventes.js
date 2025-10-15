const express = require("express");
const router = express.Router();
const Vente = require("../models/Vente");
const Produit = require("../models/Produit");

// Create vente: recalcule total et met à jour stocks
router.post("/", async (req, res) => {
  try {
    const { client, produits } = req.body; // produits = [{ produit: id, quantite, prixUnitaire }]
    if (!client || !Array.isArray(produits) || produits.length === 0) {
      return res.status(400).json({ error: "Données invalides" });
    }

    let total = 0;
    for (const p of produits) {
      total += (p.prixUnitaire * p.quantite);
      // Optionnel : décrémenter stock
      if (p.produit) {
        await Produit.findByIdAndUpdate(p.produit, { $inc: { stock: -p.quantite } });
      }
    }

    const vente = new Vente({ client, produits, total });
    await vente.save();
    res.status(201).json(vente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Get ventes (avec populate)
router.get("/", async (req, res) => {
  try {
    const ventes = await Vente.find().populate("client").populate("produits.produit");
    res.json(ventes);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
