const Sector = require("../models/sector");

const insertSector = async () => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const p1 = new Sector({
            sectorName: "IT",
        });
        const result = await p1.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertSector,
};
