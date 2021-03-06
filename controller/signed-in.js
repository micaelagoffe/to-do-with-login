const User = require("../model/user");
const ToDo = require("../model/todo");

const signedinRender = async (req, res) => {
  res.redirect("/1");
};

const paginationRender = async (req, res) => {
  const limit = 5;
  const page = req.params.page || 1;

  let sortDate = req.query.sortDate;
  let sortAZ = req.query.sortAZ;
  let sort = {};

  if (sortDate) {
    sort.created = sortDate;
  } else if (sortAZ) {
    sort.name = sortAZ;
  }

  try {
    const userTodos = await User.findOne({
      _id: req.user.username._id,
    }).populate({
      path: "todos",
      options: {
        collation: { locale: "en" },
        sort: sort,
        skip: limit * page - limit,
        limit: limit,
      },
    });

    const userTodoList = await User.findOne({
      _id: req.user.username._id,
    }).populate("todos");
    const count = userTodoList.todos.length;

    res.render("todos.ejs", {
      user: req.user.username.username,
      data: userTodos.todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
  }
};

const addTodoSubmit = async (req, res) => {
  try {
    const todo = new ToDo({ name: req.body.content });
    await todo.save();

    const user = await User.findOne({ _id: req.user.username._id });
    await user.addTodo(todo._id);

    res.redirect("/todos");
  } catch (err) {
    console.log(err);
  }
};

const editTodoRender = async (req, res) => {
  try {
    const todo = await ToDo.findOne({ _id: req.params.id });

    res.render("edit.ejs", { todo: todo });
  } catch (err) {
    console.log(err);
  }
};

const editTodoSubmit = async (req, res) => {
  try {
    await ToDo.updateOne({ _id: req.body.id }, { name: req.body.name });

    res.redirect("/todos");
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    await ToDo.deleteOne({ _id: req.params.id });

    const user = await User.findOne({ _id: req.user.username._id });
    await user.removeTodo(req.params.id);

    res.redirect("/todos");
  } catch (err) {
    console.log(err);
  }
};

const signout = (req, res) => {
  try {
    res.clearCookie("jwtToken").render("signedout.ejs");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signedinRender,
  paginationRender,
  addTodoSubmit,
  editTodoRender,
  editTodoSubmit,
  deleteTodo,
  signout,
};