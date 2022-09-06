const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports.token = async (req, res) => {
  const { username, password, client_secret } = req.body
  try {
    const user = await prisma.user.findFirst({ where: { username } })
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual || process.env.NODE_CLIENT_SECRET != client_secret) throw new Error("Parol xato")
    const token = jwt.sign(
      {
        username,
        id: user.id
      },
      client_secret,
       {
        expiresIn: '12h'
      }
    )
    res.send({ access_token:token, refresh_token: '' })
  } catch (err) {
    return res.status(400).json({ message:err.message })
  }
} 