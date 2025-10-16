import express from "express";
import Produit from "../models/Produit.js";

const router = express.Router();

// ➕ Créer un produit
router.post("/", async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📋 Récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;