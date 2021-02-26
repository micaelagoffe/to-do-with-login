const express = require("express");

const router = express.Router();

const verifiedToken = require("../middleware/verify-user");

const {signedinRender, paginationRender, addTodoSubmit, editTodoRender, editTodoSubmit} = require("../controller/signed-in");


router.get("/todos", verifiedToken, signedinRender);
router.get("/:page", verifiedToken, paginationRender);
router.post("/todos", verifiedToken, addTodoSubmit);

router.get("/edit/:id", verifiedToken, editTodoRender);
router.post("/edit", verifiedToken, editTodoSubmit);


module.exports = router;