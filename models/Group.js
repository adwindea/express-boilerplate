const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

groupSchema.plugin(AutoIncrement, {
    inc_field: 'group',
    id: 'groupNums',
    // start_seq: 500
})

module.exports = mongoose.model('Group', groupSchema)