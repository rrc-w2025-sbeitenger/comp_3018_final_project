//multer for handling file uploads
const multer = require('multer');

//using memoryStorage so file is saved as buffer objects.
//buffer allows to save to a database.
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage })
