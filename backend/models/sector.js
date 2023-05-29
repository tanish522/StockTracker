const mongoose = require("mongoose");

// creating schema
const sectorSchema = mongoose.Schema({
    sectorName: {
        type: String,
        required: true,
    },
});

const Sector = new mongoose.model("Sector", sectorSchema);
module.exports = Sector;
