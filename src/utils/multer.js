import multer from "multer";

const storage = multer.diskStorage({})

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});
