const Comment = require('../models/comment');

exports.createComment = async(req, res) =>{
    try {
        const userId = req.user._id;
        const {projectId, fieldName, fieldValue} = req.body;
        const newComment = new Comment({
            userId,
            projectId,
            fieldName,
            fieldValue
        });
        const savedComment =  await newComment.save();
        return res.status(201).json({data:savedComment});
    } catch (error) {      
        return res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getComment =  async(req, res) =>{
    try {
        const {projectId, fieldName} =  req.params;

        const comments = await Comment.find({projectId:projectId, fieldName:fieldName});

        return res.status(200).json({data:comments});
    } catch (error) {      
        return res.status(500).json({ message: "Something went wrong" });
    }
}