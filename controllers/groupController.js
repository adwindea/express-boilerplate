const Group = require('../models/Group')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all groups
// @route GET /groups
// @access Private
const getAllGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find().select("-active").lean()
    if(!groups?.length) {
        return res.status(400).json({ message: 'No groups found'})
    }
    res.json(groups)
})

// @desc Create new group
// @route POST /groups
// @access Private
const createGroup = asyncHandler(async (req, res) => {
    const { name, type } = req.body

    //Validate
    if(!name || !type){
        return res.status(400).json({ message: 'All fields are required'})
    }

    //check duplicate
    const duplicate = await Group.findOne({ name }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate group name'})
    }

    const groupObject = { name, type }

    const group = await Group.create(groupObject)

    if(group) {
        res.status(201).json({ message: `New group ${name} created`})
    } else{
        res.status(400).json({ message: `Invalid data received`})
    }
})

// @desc Update group
// @route PATCH /groups
// @access Private
const updateGroup = asyncHandler(async (req, res) => {
    const { id, name, type, active } = req.body

    //Validate
    if(!id || !name || !type || typeof active !== 'boolean') {
        return res.status(400).json({ message: `All fields are required`})
    }

    const group = await Group.findById(id).exec()

    if(!group) {
        return res.status(400).json({ message: `Group not found`})
    }

    //Check duplicate
    const duplicate = await Group.findOne({ name }).lean().exec()
    //allow updates to original group
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: `Duplicate group name`})
    }


    group.name = name
    group.type = type
    group.active = active

    const updatedGroup = await group.save()

    res.json({ message: `${updatedGroup.name} updated`})
})

// @desc Delete group
// @route DELETE /groups
// @access Private
const deleteGroup = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'Group ID Required'})
    }

    const group = await Group.findById(id).exec()

    if(!group) {
        return res.status(400).json({ message: `Group not found`})
    }
    
    const result = await group.deleteOne()

    const reply = `Group ${result.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllGroups,
    createGroup,
    updateGroup,
    deleteGroup
}