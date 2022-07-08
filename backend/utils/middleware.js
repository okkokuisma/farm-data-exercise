const multer = require('multer')
const jwt = require('jsonwebtoken')
const userService = require('../db/services/userService')

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true)
  } else {
    cb('Only CSV files are supported.', false)
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd() + '/resources/uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix)
  },
})

const uploadCsvFile = multer({ storage: storage, fileFilter: fileFilter })

const tokenValidator = (request, response, next) => {
  const token = request.cookies.access_token
  request.token = jwt.verify(token, process.env.SECRET)

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (token.id) {
    request.user = await userService.getById(token.id)
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = { uploadCsvFile, errorHandler, userExtractor, tokenValidator }