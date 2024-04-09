const Employee = require('../Model/empModel')
const fs = require('fs')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

const upload = multer({ storage })

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[^\w\d\s]).{8,}$/
    const phoneRegex = /^[6-9]\d{9}$/

    const isEmailValid = emailRegex.test(email)
    const isPasswordValid = passwordRegex.test(password)
    const isPhoneValid = phoneRegex.test(phoneNumber)

    if (!isEmailValid) {
      throw new Error('Invalid email address')
    }

    if (!isPasswordValid) {
      throw new Error(
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
      )
    }

    if (!isPhoneValid) {
      throw new Error('Invalid phone number')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingEmployee = await Employee.findOne({ email })
    if (existingEmployee) {
      throw new Error('Email already exists')
    }

    let profilePicture = null
    let profilePictureUploadedAt = null

    if (req.file) {
      const picturePath = `./upload/images/${req.file.filename}`
      profilePicture = picturePath
      profilePictureUploadedAt = Date.now()
      await fs.promises.rename(req.file.path, profilePicture)
    }

    const employee = new Employee({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      profilePicture,
      profilePictureUploadedAt
    })
    await employee.save()

    console.log(employee)
    res.status(201).json({ message: 'Employee created successfully' })
  } catch (error) {
    res.status(400).send(error.message || error)
  }
}

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
    console.log(employees)
    res.status(200).send(employees)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
    if (!employee) {
      return res.status(404).send('Employee not found')
    }
    res.status(200).send(employee)
  } catch (error) {
    res.status(500).send(error)
  }
}

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!employee) {
      return res.status(404).send('Employee not found')
    }
    res.status(200).send(employee)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) {
      return res.status(404).send('Employee not found')
    }
    res.status(200).send('Employee deleted successfully')
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  upload,
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
}
