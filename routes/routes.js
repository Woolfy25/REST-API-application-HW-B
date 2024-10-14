const express = require("express");
const router = express.Router();
const {
  getAccount,
  createAccount,
  loginAccount,
  removeAccount,
  updateAccount,
  getContacts,
  createContacts,
  updateContacts,
  removeContact,
} = require("../controllers/controler");
const { auth } = require("../middlewares/auth");

router.get("/account", getAccount);
router.post("/account/register", createAccount);
router.post("/account/login", loginAccount);
router.put("/account/:contactId", auth, updateAccount);
router.delete("/account/:contactId", auth, removeAccount);

router.get("/contacts", auth, getContacts);
router.post("/contacts", auth, createContacts);
router.put("/contacts/:contactId", auth, updateContacts);
router.delete("/contacts/:contactId", auth, removeContact);

module.exports = router;
