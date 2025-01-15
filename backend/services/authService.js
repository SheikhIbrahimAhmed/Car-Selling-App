const User = require("../models/userModel");
const Cars = require("../models/carModel");

const createPostServ = async (obj) => {
    try {
        return await Cars.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const findSingleUserServ = async (obj) => {
    try {
        return await User.findOne(obj);
    } catch (err) {
        console.log("err", err);
    }
}

module.exports = {
    findSingleUserServ,
    createPostServ
}