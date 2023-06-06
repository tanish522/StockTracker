const Sector = require("../models/sector");

const insertSector = async (req, res) => {
    try {
        // creating object for document/data;
        // save() - inserting document/data

        const body = new Sector(req.body); // sending body data in json obj format
        const result = await body.save();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

const getSector = async (req, res) => {
    try {
        // run find querry to get data
        const result = await Sector.find();
        res.send(result); // sending json obj to route
    } catch (error) {
        console.log(error);
    }
};

const deleteSector = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.params.id) {
            // for 400 - bad request
            return res.status(400).send();
        }
        const result = await Sector.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        // for 500 - server error as cannot delete data
        res.status(500).send(error);
        console.log(error);
    }
};

const updateSector = async (req, res) => {
    try {
        const body = Sector(req.body);
        const id = req.params.id;
        const filter = { _id: id };
        const result = await Sector.findOneAndUpdate(filter, body, {
            new: true,
        }); // find object with filter, and replace its body
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    insertSector,
    getSector,
    deleteSector,
    updateSector,
};
