const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/Utilisateur");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Register
router.post("/register", async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;
    const exists = await Utilisateur.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email déjà utilisé" });

    const hash = await bcrypt.hash(motDePasse, 10);
    const user = new Utilisateur({ nom, email, motDePasse: hash });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await Utilisateur.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const ok = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!ok) return res.status(400).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "4h" });
    res.json({ token, user: { nom: user.nom, email: user.email, role: user.role }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
