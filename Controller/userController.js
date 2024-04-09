const User = require('../Model/userModel')
const bcrypt = require('bcrypt')
const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, role } = req.body
    const hashedPassword = await bcrypt.hash(userPassword, 10)
    const user = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
      role
    })
    await user.save()
    res.status(201).send('SignUp Successful')
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.json(users)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send('Employee not found')
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!user) {
      return res.status(404).send('Employee not found')
    }
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send(error)
  }
}
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.status(200).send('User deleted successfully')
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById
}
