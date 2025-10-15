const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const produitsRoutes = require("./routes/produits");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/produits", produitsRoutes);

// Connexion MongoDB
mongoose
  .connect("mongodb://localhost:27017/gestionventes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB", err));

// Routes
app.use("/api/produits", produitsRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
