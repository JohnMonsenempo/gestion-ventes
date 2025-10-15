import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>🛒 Gestion de Ventes</h2>
      <div>
        <Link to="/" style={styles.link}>
          Produits
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#1976d2",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  title: {
    margin: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
