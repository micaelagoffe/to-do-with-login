const express = require("express");

const router = express.Router();

const verifiedToken = require("../middleware/verify-user");

const {signedinRender, paginationRender, addTodoSubmit, editTodoRender, editTodoSubmit, deleteTodo} = require("../controller/signed-in");


router.get("/todos", verifiedToken, signedinRender);
router.get("/:page", verifiedToken, paginationRender);
router.post("/todos", verifiedToken, addTodoSubmit);

router.get("/edit/:id", verifiedToken, editTodoRender);
router.post("/edit", verifiedToken, editTodoSubmit);

router.get("/delete/:id", verifiedToken, deleteTodo);


module.exports = router;