import React from "react";
import axios from "axios";

const ProduitList = ({ produits, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      try {
        await axios.delete(`http://localhost:5001/api/produits/${id}`);
        alert("🗑️ Produit supprimé !");
        onDelete(id);
      } catch (err) {
        console.error(err);
        alert("❌ Erreur lors de la suppression");
      }
    }
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix ($)</th>
          <th>Quantité</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {produits.map((p) => (
          <tr key={p._id}>
            <td>{p.nom}</td>
            <td>{p.prix}</td>
            <td>{p.quantite}</td>
            <td>{p.prix * p.quantite}</td>
            <td>
              <button onClick={() => handleDelete(p._id)} style={styles.btn}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  btn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default ProduitList;
