import multer from 'multer'
import { extname } from 'path'

export const storage = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname)
    if (ext !== '.mp4') {
      cb(new Error(`Invalid file! ${ext} is not supported`), false)
      return
    }
    cb(null, true)
  },
})
