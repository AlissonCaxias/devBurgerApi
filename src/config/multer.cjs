const multer  = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');
module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (_req, image, callback) => {
            const uniqueName = v4().concat(`-${image.originalname}`);
            return callback(null, uniqueName);
        },
    }),
};