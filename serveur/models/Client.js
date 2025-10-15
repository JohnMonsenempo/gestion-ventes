const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: String,
  telephone: String,
  adresse: String
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
