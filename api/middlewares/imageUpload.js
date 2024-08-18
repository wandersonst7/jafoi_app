const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "products";
        cb(null, `uploads/${folder}/`)
    }, 

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        cb(undefined, true)
    }
})

module.exports = {
    imageUpload
}