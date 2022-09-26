const bcrypt = require('bcrypt')

const { User } = require('../dbInit')
const { validatePassword } = require('../../utils/dataValidator')


const getById = async (id) => {
  return await User.findOne({
    where: { id: id }
  })
}

const getByUsername = async (username) => {
  return await User.findOne({
    where: { username: username }
  })
}

const remove = async (id) => {
  return await User.destroy({
    where: { id: id }
  })
}

const create = async ({ username, password }) => {
  if (!validatePassword(password)) {
    const error = new Error()
    error.name = 'MalformattedPasswordError'
    throw error
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  return await User.create({ username, passwordHash })
}

module.exports = { create, getById, getByUsername, remove }