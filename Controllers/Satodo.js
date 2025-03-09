const Satodo = require("../models/setodo");

async function savedata(req, resp) {
    try {
        const { name, lname, email, createAt, updateat,Title, priority, status, description, completedDate } = req.body;
        const newTodo = new Satodo({ name, lname, email,Title, createAt, updateat, priority, status, description, completedDate });
        await newTodo.save();
        resp.status(200).json({ msg: "Data uploaded successfully" });
    } catch (error) {
        resp.status(500).json({ msg: "Internal server error" });
    }
}

async function getdata(req, resp) {
    try {
        const response = await Satodo.find();
        if (response.length === 0) {
            return resp.status(400).json({ msg: "Data not found" });
        }
        resp.status(200).json({ data: response });
    } catch (error) {
        resp.status(500).json({ msg: "Internal server error" });
    }
}

async function getdataById(req, resp) {
    try {
        const { id } = req.params;
        const userExist = await Satodo.findById(id);
        if (!userExist) {
            return resp.status(400).json({ msg: "Data not found" });
        }
        resp.status(200).json({ data: userExist });
    } catch (error) {
        resp.status(500).json({ msg: "Internal server error" });
    }
}

async function updateuser(req, resp) {
    try {
        const { id } = req.params;
        const { name, lname, email, completedDate, updateat,Title, priority, status, description, createAt } = req.body;
        const userExist = await Satodo.findById(id);
        if (!userExist) {
            return resp.status(400).json({ msg: "Data not found" });
        }
        const updatedUser = await Satodo.findByIdAndUpdate(
            id,
            { name, lname, email, completedDate, updateat:new Date().toISOString().split("T")[0], priority,Title, status, description, createAt },
            { new: true }
        );
        resp.status(200).json({ msg: "Data updated successfully", data: updatedUser });
    } catch (error) {
        resp.status(500).json({ msg: "Internal server error" });
    }
}

async function deleteuser(req, resp) {
    try {
        const { id } = req.params;
        const userExist = await Satodo.findById(id);
        if (!userExist) {
            return resp.status(400).json({ msg: "Data not found" });
        }
        await Satodo.findByIdAndDelete(id);
        resp.status(200).json({ msg: "Data deleted successfully" });
    } catch (error) {
        resp.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = { savedata, getdata, getdataById, updateuser, deleteuser };
