const User = require('../dbInit').User

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

const create = async (values) => {
  return await User.create(values)
}

module.exports = { create, getById, getByUsername, remove }