const User = require("./schemas/User");

const getAllUsers = async () => {
  return User.find();
};

const createContact = async ({ name, email, phone, favorite }) => {
  return User.create({ name, email, phone, favorite });
};

const updateContact = async (contactId, updatedData) => {
  return User.findByIdAndUpdate(
    { _id: contactId },
    { $set: updatedData },
    { new: true }
  );
};

const deleteContact = async (contactId) => {
  return User.deleteOne({ _id: contactId });
};

module.exports = {
  getAllUsers,
  createContact,
  updateContact,
  deleteContact,
};
