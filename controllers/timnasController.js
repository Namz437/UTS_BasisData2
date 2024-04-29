// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Timnas = require('../models/Timnas');

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk mahasiswa
  viewTimnas: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const timnas = await Timnas.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        timnas,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/timnas");
    }
  },

  // Membuat create data untuk timnas
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  // Metode untuk menambahkan data hijab
  addTimnas: async (req, res) => {
    try {
      const { nama, no_punggung, posisi, foto, klub, tanggal_naturalisasi } = req.body;
      await Timnas.create({ nama, no_punggung, posisi, foto, klub, tanggal_naturalisasi });
      req.flash("alertMessage", "Berhasil menambahkan data pemain.");
      req.flash("alertStatus", "success");
      res.redirect("/timnas");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/timnas");
    }
  },

  // Metode untuk mengedit data timnas
  editTimnas: async (req, res) => {
    try {
      const { id, nama, no_punggung, posisi, foto, klub, tanggal_naturalisasi } = req.body;
      const timnas = await Timnas.findOne({ _id: id });

      timnas.id = id;
      timnas.nama = nama;
      timnas.no_punggung = no_punggung;
      timnas.posisi = posisi;
      timnas.foto = foto;
      timnas.klub = klub;
      timnas.tanggal_naturalisasi = tanggal_naturalisasi;

      await timnas.save();
      req.flash("alertMessage", "Berhasil mengedit data pemain.");
      req.flash("alertStatus", "success");
      res.redirect("/timnas");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/timnas");
    }
  },

  // Membuat delete data untuk mahasiswa
  deleteTimnas: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const timnas = await Timnas.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await timnas.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data pemain");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/timnas");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/timnas");
    }
  },
  viewTimnasDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const timnas = await Timnas.findOne({ _id: id });

      // Render view detail hijab dan pass data hijab
      res.render("detail", {
        timnas,
        title: "Detail Timnas",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/timnas");
    }
  },
};