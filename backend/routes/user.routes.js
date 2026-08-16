const { Router } = require("express");
const { getAll, getOne, create, update, remove } = require("../controllers/user.controller");

const router = new Router();

router.get("/users", getAll);
router.get("/users/:id", getOne);
router.post("/users", create);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

module.exports = router;
