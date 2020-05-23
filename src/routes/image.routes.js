const { Router } = require('express'); 

const router = new Router();

const path = require('path');
const multer = require('multer');
const fs = require('fs');

// RENDER FORM UPLOAD
router.get('/', (req, res) => {
    res.render('index');
});

// UPLOAD V1 - general Middlware
// router.post('/images/upload', (req, res) => {
//     console.log(req.file);
//     res.send('received');
// });

// UPLOAD V2 - pre execution of a function
// saving with its original name
// router.post('/images/upload', multer({
//     dest: path.join(__dirname, '../public/uploads'),
// }).single('image'), (req, res, next) => {
//     console.log(req.file);
//     const ext = path.extname(req.file.originalname).toLocaleLowerCase();
//     fs.rename(req.file.path, `./src/public/uploads/${req.file.originalname}`, () => {
//         res.send('received');
//     });
// });

// UPLOAD V3- using general middleware
// router.post('/images/upload', (req, res) => {
//     console.log(req.file);
//     res.send('uploaded');
// });

// app.use(multer({
//     dest: path.join(__dirname, 'public/uploads'), // directorio del js + /public/uploads

//     limits: {fileSize: 1000000},
// }).single('image')); // solo recibo una imagen


// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../public/uploads'),
//     fileFilter: function (req, file, cb) {
//         var filetypes = /jpeg|jpg|png|gif/;
//         var mimetype = filetypes.test(file.mimetype);
//         var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("Error: File upload only supports the following filetypes - " + filetypes);
//     },
//     filename:  (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadImage = multer({
    storage,
    limits: {fileSize: 2000000}
}).single('image');

router.post('/images/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        
        res.send('uploaded');
    });
});

router.get('/images', (req, res) => {});

module.exports = router;