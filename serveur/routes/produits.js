const express = require("express");
const router = express.Router();
const Produit = require("../models/Produit");


// Obtenir tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    console.error("Erreur de chargement ❌", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Supprimer un produit
router.delete("/:id", async (req, res) => {
  try {
    await Produit.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression produit ❌", err);
    res.status(500).send("Erreur serveur");
  }
});



// Ajouter un produit
router.post("/", async (req, res) => {
  try {
    const { nom, prix } = req.body;
    // si quantite n'est pas envoyée, on la met à 0
    const quantite = req.body.quantite !== undefined ? Number(req.body.quantite) : 0;

    const produit = new Produit({
      nom,
      prix: Number(prix),
      quantite,
    });

    // ✅ Modifier un produit existant
router.put("/:id", async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne le produit modifié
    );
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
  }
});


    const nouveauProduit = await produit.save();
    res.status(201).json(nouveauProduit);
  } catch (error) {
    console.error("Erreur ajout produit ❌", err);
    res.status(500).json({ message: error.message });
  }
});

// ✅ Modifier un produit existant
router.put("/:id", async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne le produit modifié
    );
    if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit" });
  }
});


module.exports = router;
