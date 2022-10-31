const multer = require('multer')
const jwt = require('jsonwebtoken')

const userService = require('../db/services/userService')
const { SECRET } = require('../utils/config')

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

const uploadCsvFile = multer({ storage, fileFilter })

const tokenValidator = (request, response, next) => {
  const token = request.cookies.access_token
  request.token = jwt.verify(token, SECRET)

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
    return response.status(401).json({ type: 'JsonWebTokenError', message: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ type: 'TokenExpiredError', message: 'token expired' })
  } else if (error.name === 'UnauthorizedActionError') {
    return response.status(401).json({ type: 'UnauthorizedActionError', message: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({
      type: 'SequelizeValidationError',
      message: `${error.errors[0].message}`
    })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({
      type: 'SequelizeDatabaseError',
      message: 'database query error'
    })
  } else if (error.name === 'NoFarmFoundError') {
    return response.status(400).json({
      type: 'NoFarmFoundError',
      message: 'No farms found with the given id.'
    })
  } else if (error.name === 'MalformattedPasswordError') {
    return response.status(400).json({
      type: 'MalformattedPasswordError',
      message: 'Password should contain minimum eight characters, at  least one uppercase letter, one lowercase letter, one number and one special character'
    })
  } else if (error.name === 'UsernameTakenError') {
    return response.status(400).json({
      type: 'UsernameTakenError',
      message: 'requested username already in use'
    })
  } else if (error.name === 'InvalidDataPointValueError') {
    return response.status(400).json({
      type: 'InvalidDataPointValueError',
      message: 'added data point contained invalid values'
    })
  } else if (error.name === 'InvalidFileUploadError') {
    return response.status(400).json({
      type: 'InvalidFileUploadError',
      message: 'Uploaded file contained invalid data.'
    })
  }

  next(error)
}

module.exports = { uploadCsvFile, errorHandler, userExtractor, tokenValidator }