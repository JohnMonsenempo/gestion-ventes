import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Produits() {
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editPrix, setEditPrix] = useState("");

  const chargerProduits = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/produits");
      setProduits(res.data);
    } catch (err) {
      console.error("Erreur de chargement ❌", err);
    }
  };

  const ajouterProduit = async () => {
    try {
      await axios.post("http://localhost:5001/api/produits", { nom, prix });
      setNom("");
      setPrix("");
      chargerProduits();
    } catch (err) {
      console.error("Erreur d’ajout ❌", err);
    }
  };

  const supprimerProduit = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/produits/${id}`);
      chargerProduits();
    } catch (err) {
      console.error("Erreur suppression ❌", err);
    }
  };

  const modifierProduit = (produit) => {
    setEditingId(produit._id);
    setEditNom(produit.nom);
    setEditPrix(produit.prix);
  };

  const enregistrerModification = async (id) => {
    try {
      await axios.put(`http://localhost:5001/api/produits/${id}`, {
        nom: editNom,
        prix: editPrix,
      });
      setEditingId(null);
      chargerProduits();
    } catch (err) {
      console.error("Erreur de modification ❌", err);
    }
  };

  useEffect(() => {
    chargerProduits();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Liste des produits</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Nom du produit"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <button onClick={ajouterProduit}>Ajouter</button>
      </div>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((p) => (
            <tr key={p._id}>
              <td>
                {editingId === p._id ? (
                  <input
                    value={editNom}
                    onChange={(e) => setEditNom(e.target.value)}
                  />
                ) : (
                  p.nom
                )}
              </td>
              <td>
                {editingId === p._id ? (
                  <input
                    type="number"
                    value={editPrix}
                    onChange={(e) => setEditPrix(e.target.value)}
                  />
                ) : (
                  `${p.prix} $`
                )}
              </td>
              <td>
                {editingId === p._id ? (
                  <button onClick={() => enregistrerModification(p._id)}>
                    ✅ Enregistrer
                  </button>
                ) : (
                  <button onClick={() => modifierProduit(p)}>✏️ Modifier</button>
                )}
                <button onClick={() => supprimerProduit(p._id)}>🗑 Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
