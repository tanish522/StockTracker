const express = require("express");
const router = express.Router();
const {
    insertSector,
    getSector,
    deleteSector,
    updateSector,
} = require("../controller/sector.controller");

router.post("/", insertSector);

router.get("/", getSector);

router.delete("/:id", deleteSector);

router.put("/:id", updateSector);

module.exports = router;
