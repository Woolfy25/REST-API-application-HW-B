const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Contacts are displayed successfully",
      data: { ...contacts },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la preluarea task-urilor",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json({
      status: "succes",
      code: 200,
      message: "Contact is displayed successfully",
      data: { ...contact },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la preluarea task-urilor",
    });
  }
});

router.post("/", async (req, res, next) => {
  // const contact = req.body;
  const { error, value } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    const data = await addContact(value);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact added successfully",
      data: { ...data },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la preluarea task-urilor",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la stergerea task-ului",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  // const body = req.body;

  const { error, value } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    const data = await updateContact(contactId, value);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact edited successfully",
      data: { ...data },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Eroare la editarea task-ului",
    });
  }
});

module.exports = router;
