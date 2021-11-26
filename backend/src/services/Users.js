// import model(s)
const Model = require("../models/users/index.js");

module.exports = {
    async getAll(details) {
        return await Model.find(details || {});
    },

    async getOne(details) {
        return await Model.findOne(details || {});
    },

    async getById(id) {
        return await Model.findById(id);
    },

    async create(details) {
        return await new Model(details);
    },

    async update(id, details) {
        return await Model.findByIdAndUpdate(id, details);
    },

    async delete(id) {
        return await Model.findByIdAndDelete(id);
    }
}