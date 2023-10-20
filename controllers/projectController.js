const Project = require('../models/project');

exports.createProject = async(req, res) =>{
    try {
        const {name} =req.body;
        const newProject = new Project({name});
        const saveproject = await newProject.save();
        return res.status(200).json({project:saveproject});
    } catch (error) {
        console.log(error);
    }
}