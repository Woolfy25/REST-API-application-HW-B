const express = require("express");
const router = express.Router();
const controller = require("../controllers/controler");

router.get("/", controller.get);
router.post("/", controller.create);
router.put("/:contactId", controller.update);
router.delete("/:contactId", controller.remove);

module.exports = router;
