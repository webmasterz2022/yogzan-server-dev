const router = require('express').Router()
const multer = require('multer');
const GalleryController = require('../controllers/galleryController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');

const maxSize = 2*1024*1024; //2 MB

const storage = type => getStorage(type);
const upload = (type, fieldName) => multer({ 
  storage: storage(type),
  limits: { fileSize: maxSize }
}).single(fieldName)

router.post('/upload', authentication, upload('Gallery', 'images'), GalleryController.upload)
router.post('/upload-homepage', authentication, upload('Homepage', 'images'), GalleryController.uploadHomepage)

router.get('/', GalleryController.findAll)
router.get('/homepage', GalleryController.findHomepage)
router.get('/category/:category', GalleryController.findCategory)

module.exports = router