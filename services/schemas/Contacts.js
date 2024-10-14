const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema({
  name: { type: String, require: [true, "Set name for contact"], minLength: 2 },
  email: { type: String, require: true, minLength: 2 },
  phone: { type: String, require: true, minLength: 2 },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = mongoose.model("Contacts", contacts, "phonebooks");

module.exports = Contacts;
