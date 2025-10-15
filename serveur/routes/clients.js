const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Create
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) { res.status(500).json({ error: "Erreur serveur" }); }
});

// Get all
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) { res.status(500).json({ error: "Erreur serveur" }); }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const c = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(c);
  } catch (err) { res.status(500).json({ error: "Erreur serveur" }); }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client supprimé" });
  } catch (err) { res.status(500).json({ error: "Erreur serveur" }); }
});

module.exports = router;
