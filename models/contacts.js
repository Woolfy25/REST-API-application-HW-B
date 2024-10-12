const fs = require("fs").promises;
const { waitForDebugger } = require("inspector");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (element) => element.id === contactId
    );
    console.table(filteredContacts);
    return filteredContacts;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log("Utilizatorul a fost sters");
    } else {
      console.log("Utilizatorul nu a fost gasit!");
    }
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: new Date(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("Utilizatorul a fost adaugat");
    return contacts;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    contacts[index] = { id: contactId, name, email, phone };
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error("Eroare la cititrea fisierului", error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
