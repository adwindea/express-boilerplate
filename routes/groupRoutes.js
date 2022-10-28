const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groupController')

router.route('/')
    .get(groupController.getAllGroups)
    .post(groupController.createGroup)
    .patch(groupController.updateGroup)
    .delete(groupController.deleteGroup)

module.exports = router