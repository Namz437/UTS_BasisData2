// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const timnasController = require("../controllers/timnasController");

// endpoint timnas
router.get("/", timnasController.viewTimnas); // Untuk view
router.post("/", timnasController.addTimnas); // untuk menambah produk
router.put("/", timnasController.editTimnas); // untuk edit
router.delete("/:id", timnasController.deleteTimnas); // untuk delete
router.get("/:id", timnasController.viewTimnasDetail); // Route untuk view detail timnas
// Lalu export routernya
module.exports = router;