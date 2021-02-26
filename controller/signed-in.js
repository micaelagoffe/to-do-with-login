const ToDo = require("../model/todo");


const signedinRender = async (req, res) => {
  res.redirect("/1");
};

const paginationRender = async (req, res) => {
  let limit = 5;
  let page = req.params.page || 1;

  let sortDate = req.query.sortDate;
  let sortAZ = req.query.sortAZ;
  let sort = {};

  if (sortDate) {
    sort.created = sortDate;
  } else if (sortAZ) {
    sort.name = sortAZ;
  }

  try {
    const todos = await ToDo.find()
      .collation({ locale: "en" })
      .sort(sort)
      .skip(limit * page - limit)
      .limit(limit);
    const count = await ToDo.countDocuments();

    res.render("todos.ejs", {
      data: todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.log(err);
  }
};

const addTodoSubmit = async (req, res) => {
  const task = new ToDo({ name: req.body.content });

  await task.save();

  res.redirect("/todos");
};

const editTodoRender = async (req, res) => {
    const todo = await ToDo.findOne({ _id: req.params.id });
  
    res.render("edit.ejs", { todo: todo });
  };
  
const editTodoSubmit = async (req, res) => {
await ToDo.updateOne({ _id: req.body.id }, { name: req.body.name });

res.redirect("/todos");
};


module.exports = {
  signedinRender,
  paginationRender,
  addTodoSubmit,
  editTodoRender,
  editTodoSubmit
};