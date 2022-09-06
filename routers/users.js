const { Router } = require('express')
const router = Router()
const userCon = require('../controllers/userCon')
const TokenGenerate = require('../services/tokenGenerator')
const auth = require('../middleware/auth')


router.post('/', userCon.create)
router.post('/token', TokenGenerate.token)
router.get('/auth', auth, userCon.getOne)


module.exports = router