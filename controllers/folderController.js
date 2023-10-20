
const Folder = require('../models/folders');
const Image = require('../models/images');

const addFolder = async (req, res) => {
    const { projectId, name, parentId} = req.body;
   
    try {

        const newFolder = new Folder({
            projectId,
            name,
            parentId,
        });

        await newFolder.save();

        res.status(200).json({ message: 'Folder created successfully', folder: newFolder });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create folder', errorMessage: error.message });
    }
};

const createRootFolder = async(req, res) =>{
    try {
        const {projectId, names} = req.body;

        const createdFolders = await Promise.all(
            names.map(async (folderName) => {
              const folder = new Folder({
                projectId,
                name: folderName,
                parentId: null, // Setting parentId to null
              });
      
              return await folder.save();
            })
          );
        res.status(200).json({ createdFolders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });   
    }
}


const getFolderByFolderId = async (req, res) => {
    try {
        const parentId = req.params.id;

        const folders = await Folder.find({ parentId }).populate('parentId', 'name').exec();


        const images = await Image.find({ folderId:parentId });
  
        const imageUrls = images.map(image => ({
          _id: image._id,
          url: `${req.protocol}://${req.get('host')}/uploads/${image.file}` 
        }));
        res.status(200).json({ folders:folders, images:imageUrls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getRootFolder = async(req, res) =>{
    try {
        const projectId = req.params.id;
        const folders = await Folder.find({ parentId: null, projectId:projectId});

        if (!folders || folders.length === 0) {
            return res.status(200).json({ folders: [] });
        }

        res.status(200).json({ folders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


module.exports = {
    addFolder,
    getFolderByFolderId,
    getRootFolder,
    createRootFolder
};
