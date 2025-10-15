import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ModifierProduit() {
  const { id } = useParams();
  const [produit, setProduit] = useState({ nom: "", prix: "", quantite: "" });
  const navigate = useNavigate();

  useEffect(() => {
    chargerProduit();
  }, []);

  const chargerProduit = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/produits/${id}`);
      setProduit(res.data);
    } catch (err) {
      alert("Erreur lors du chargement du produit ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/produits/${id}`, produit);
      alert("Produit modifié ✅");
      navigate("/");
    } catch (err) {
      alert("Erreur lors de la modification ❌");
    }
  };

  return (
    <div>
      <h2>Modifier le Produit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={produit.nom}
          onChange={(e) => setProduit({ ...produit, nom: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={produit.prix}
          onChange={(e) => setProduit({ ...produit, prix: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantité"
          value={produit.quantite}
          onChange={(e) => setProduit({ ...produit, quantite: e.target.value })}
          required
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default ModifierProduit;
