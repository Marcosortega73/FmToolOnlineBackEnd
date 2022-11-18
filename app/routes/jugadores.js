const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const uploadFile = require("../middlewares/fileManager");
const router = express.Router();
const {
  getItems,
  getItem,
  createItems,

  getStatsJugadoresByEquipo,
  updateItems,
  getJugadoresByEquipo,
  deleteItems,
  getItemsFilter,
} = require("../controllers/jugadores");

router.get("/obtenerJugadores", getItems);

router.get("/jugadoresByEquipo/:id", getJugadoresByEquipo);
router.get("/statsJugadoresByEquipo/:id", getStatsJugadoresByEquipo);


router.get("/filtros", getItemsFilter);

router.get("/:id", getItem);

router.post("/crearJugador", verifyToken, createItems);

router.put("/:id", updateItems);

router.delete("/eliminarJugador/:id", deleteItems);

module.exports = router;
