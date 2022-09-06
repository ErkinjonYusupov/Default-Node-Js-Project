const prisma = require('../config/prismaClient')
const bycrypt = require('bcrypt')
//royhatdan otish
module.exports.create = async (req, res) => {
    try {
      const { fullName, username, password, phone } = req.body
        await prisma.user.create({
          data: {
            fullName,
            username,
            phone,
            password: await bycrypt.hash(password, 10),
            active: true
          }
        })
        res.status(201).json({message:"Success!"})
    } catch (err) {
      res.status(409).json({ message: err.message })
    }
  }
  //auth userni chiqarish
module.exports.getOne = async (req, res) => {
    try {
      const user_ = await prisma.user.findFirst({
        where: {
          id: +req.user.id
        },
        select:{
          id:true,
          fullName:true,
          username:true,
          phone:true
        }
      })
      res.status(200).json(user_)
    } catch (err) {
      {
        res.status(400).json(err.message)
      }
    }
  }