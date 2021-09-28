const fs = require('fs/promises')
const path = require('path')
const contactsOperations = require('./contacts')

const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        return console.table(await contactsOperations.listContacts())

      case 'get':
        return console.table(await contactsOperations.getContactById(id))

      case 'add':
        return console.table(
          await contactsOperations.addContact(name, email, phone),
        )

      case 'remove':
        return console.table(await contactsOperations.removeContact(id))

      default:
        console.warn('\x1B[31m Unknown action type!')
    }
  } catch (error) {
    throw error
  }
}

invokeAction(argv)
