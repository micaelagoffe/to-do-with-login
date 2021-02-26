const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema ({
    name: {type: String, required: true, minlength: 1, maxlength: 20},
    created: {type: Date, default: Date.now}
});

const ToDo = mongoose.model("todos", toDoSchema);

module.exports = ToDo; 