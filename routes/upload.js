import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: join(__dirname, 'uploads'),
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5  // Limit the file size to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Only allow jpg, jpeg, and png files
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);  // Reject non-image files
        }
    }
});

export default upload;
