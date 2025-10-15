import React, { useState } from "react";
import axios from "axios";

function ProduitForm({ onAdd }) {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom || !prix) {
      alert("Nom et prix sont requis");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5001/api/produits", {
        nom,
        prix: Number(prix),
        // quantite pas envoyé — backend mettra default 0
      });
      onAdd(res.data);
      setNom("");
      setPrix("");
    } catch (err) {
      console.error("Erreur d’ajout ❌", err);
      alert("Erreur lors de l'ajout du produit");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du produit"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Prix"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default ProduitForm;
