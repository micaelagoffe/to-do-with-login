const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 10,
  },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 3 },
  token: String,
  tokenExpiration: Date,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todos",
    },
  ],
});

userSchema.methods.addTodo = function (todoID) {
  this.todos.push(todoID);
  this.save();
};

userSchema.methods.removeTodo = function (todoId) {
  this.todos.pull(todoId);
  this.save();
};

const User = mongoose.model("user", userSchema);

module.exports = User;