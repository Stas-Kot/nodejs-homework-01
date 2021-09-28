const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'db/contacts.json')

async function updateContacts(newContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, 'utf-8'))
}

async function getContactById(contactId) {
  const contacts = await listContacts()
  const contactById = contacts.find(
    (contact) => String(contact.id) === contactId,
  )
  console.log(contactById)
  if (!contactById) {
    return null
  }
  return contactById
}

async function removeContact(contactId) {
  const contacts = await listContacts()
  // const idx = contacts.findIndex((contact) => contact.id === contactId)
  // if (idx === -1) {
  //   return `"id:${contactId}" does not exist`
  // }
  const contact = contacts.find((item) => String(item.id) === contactId)
  if (!contact) {
    return `"id:${contactId}" does not exist`
  }

  const newContacts = contacts.filter((contact) => contact.id !== contactId)
  updateContacts(newContacts)

  // contacts.splice(idx, 1)
  // await fs.writeFile(filePath, JSON.stringify(contacts))

  return 'Success remove'
}

async function addContact(name, email, phone) {
  const contacts = await listContacts()
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
