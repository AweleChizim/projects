const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
    {
        item: {
            type: Number,
            required: true
        },
        task: {
            type: String,
            required: [true, "Please enter a todo"]
        },
        user: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;