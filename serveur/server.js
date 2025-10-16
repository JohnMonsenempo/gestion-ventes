import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import produitsRoutes from "./routes/produits.js"; // ← note le .js à la fin (obligatoire en ES module)

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/produits", produitsRoutes);

// Test affichage URI (tu peux l’enlever après)
console.log("🔍 URI utilisée :", process.env.MONGO_URI);

// Connexion MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB", err));

// Démarrage du serveur
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
