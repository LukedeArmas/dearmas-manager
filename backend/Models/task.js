const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: String,
        required: true,
        enum: ['Phone', 'Laptop', 'Ipad', 'Desktop']
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['open', 'closed', 'new'],
        default: 'new'
    }
}, {timestamps: true }
)

module.exports = model('Task', taskSchema)