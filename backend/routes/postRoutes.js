const express = require('express');
const router = express.Router();
const loginMiddleware = require('../middleware/loginMiddleware');
const { createPost } = require('../controllers/postController');
const multer = require('multer')
const app = express();

const storage = multer.diskStorage({ //move to saperate file export and then import here
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
});
const upload = multer({ //move to multer js in middlewares
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg or .png files are allowed!'), false);
        }
    },
});

app.use(express.urlencoded({ extended: true }));



router.post('/create-post', loginMiddleware, createPost);
router.post("/upload-images", upload.array("images", 10), (req, res) => {
    try {
        const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
        res.status(200).json({ imageUrls });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ message: "Failed to upload images" });
    }
});

module.exports = router;
