const express  = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { FormPost } = require("../controllers/formController");
const folderController = require('../controllers/folderController');
const projectController =require('../controllers/projectController');
const imageController = require('../controllers/imageCOntroller');


const {auth, isAdmin, isVendor}  = require('../middlewares/Auth');
const { imageSingleUpload , imageMultiUpload, FormFelidsMulter} = require("../middlewares/multer");
// Home 
router.get("/", (req, res) =>{
    res.send("Welcome to premaconsulting Backend");
});
//Admin Route//
router.post("/register-user", userController.signUp);
router.post("/login-user", userController.login);
router.get("/my-profile", auth, userController.getMyProfile);//auth
router.put("/update-user",imageSingleUpload, auth, userController.updateUser);
router.post("/forget-password",  userController.forgotPassword);
router.post("/change-password", auth, userController.updatePassword);

//project route//
router.post("/add-project", auth, projectController.createProject)


// form felids
router.post("/project-details",auth, FormFelidsMulter,FormPost);


//folder Route//
router.post("/add-folder", auth, folderController.addFolder);
router.post("/add-root-folder", auth, folderController.createRootFolder)
router.get("/get-folders-by-folder/:id", auth, folderController.getFolderByFolderId);
router.get("/get-root-folder/:id", auth, folderController.getRootFolder);

//image route//
router.post("/upload-images", auth, imageController.uploadImagesController);

module.exports = router;