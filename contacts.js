const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const parsedContatcs = JSON.parse(contacts);
  return parsedContatcs;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
