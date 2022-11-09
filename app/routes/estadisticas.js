const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();
const {
  getItems,
  cargarRojas,
  cargarGoleadores,
  getEstadisticasByTorneo,
  cargarAsistencias,
  cargarAmarillas,
  cargarMvp,
  getGoleadoresByTorneo,
  cargarLesionRoja,
  cargarLesionNaranja,
  getSancionadosByEquipoByTorneo
} = require("../controllers/estadisticas");

router.get("/obtenerEstadisticas", getItems);

router.post("/cargarRojas", cargarRojas);

//amarillas
router.post("/cargarAmarillas", cargarAmarillas);

router.post("/cargarLesionNaranja", cargarLesionNaranja);

router.post("/cargarLesionRoja", cargarLesionRoja);

router.post("/cargarMvp", cargarMvp);

//Goleador
router.post("/cargarGoleadores", cargarGoleadores);

//asistencias
router.post("/cargarAsistencias", cargarAsistencias);

router.get("/obtenerGoleadores/:id", getGoleadoresByTorneo);
router.get("/obtenerEstadisticas/:torneo_id", getEstadisticasByTorneo);
router.get("/obtenerSancionados/:equipo_id", getSancionadosByEquipoByTorneo);

module.exports = router;
