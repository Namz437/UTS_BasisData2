const mongoose = require("mongoose");

// Membuat variabel baru dengan nama timnasScheme
const timnasScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  no_punggung: {
    type: String,
    required: true,
  },
  posisi: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  klub: {
    type: String,
    required: true,
  },
  tanggal_naturalisasi: {
    type: String,
    required: true,
  },
  
});

// lalu mengekspor model dari timnas, tujuan mengekspor ini supaya model dari timnas ini bisa digunakan dimana saja
module.exports = mongoose.model("Timnas", timnasScheme);