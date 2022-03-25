const { Schema, model } = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        require: true
    },
    text: {
        type: String,
        required: true
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,
    }
}, {timestamps: true }
)

//Export the model
module.exports = model('Comment', commentSchema);