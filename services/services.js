const User = require("./schemas/User");
const Contacts = require("./schemas/Contacts");

const getAllAccounts = async () => {
  return User.find();
};

const createAccount = async ({ email, password }) => {
  try {
    const userExistent = await User.findOne({ email });
    if (userExistent) {
      throw new Error("Aceste email exista deja!");
    }

    const newUser = User({ email });
    newUser.setPassword(password);

    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const checkUserDB = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      throw new Error("Email sau parola gresita!");
    }
    // if (!user) {
    //   throw new Error("Aceste email nu exista!");
    // }
    // if (user.password !== password) {
    //   throw new Error("Aceasta parola nu exista!");
    // }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateAccount = async (contactId, updatedData) => {
  return User.findByIdAndUpdate(
    { _id: contactId },
    { $set: updatedData },
    { new: true }
  );
};

const deleteAccount = async (contactId) => {
  return User.deleteOne({ _id: contactId });
};

const getAllContacts = async () => {
  return Contacts.find();
};

const addContact = async ({ name, email, phone, favorite }) => {
  return Contacts.create({ name, email, phone, favorite });
};

const updateContact = async (contactId, updatedData) => {
  return User.findByIdAndUpdate(
    { _id: contactId },
    { $set: updatedData },
    { new: true }
  );
};

const deleteContact = async (contactId) => {
  return Contacts.deleteOne({ _id: contactId });
};

module.exports = {
  getAllAccounts,
  createAccount,
  checkUserDB,
  updateAccount,
  deleteAccount,
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
};
