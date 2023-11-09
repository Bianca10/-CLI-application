const path = require("path");
const fs = require("fs");
const nanoid = require("nanoid");
const { error } = require("console");

const contactsPath = path.join(__dirname, "db", "contacts.json");
//console.log(contactsPath);

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error on reading file!", err);
      return;
    }
    //console.log(data);
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}
listContacts();

function addContact(name, email, phone) {
  if (!name && !email && !phone) {
    console.error("Please add a ,name ,email ,phone");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error on reading file!", err);
      return;
    }
    const contacts = JSON.parse(data);
    const newcontacts = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newcontacts);
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("Contact added!");
    });
  });
}

//addContact("Bianca", "bianca@gmail.com", "90375895485");

function removeContact(contactId) {
  if (contactId === undefined) {
    console.error(
      "Please provide the index of the contact you want to remove!"
    );
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error reading file!");
      return;
    }

    const contacts = JSON.parse(data);
    if (!contacts[contactId]) {
      console.log(`Contact at index ${contactId} does not exist!`);
      return;
    }
    contacts.splice(contactId, 1);
    console.log(`Contact at index ${contactId} was deleted!`);
    // console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.error("Error on deleting contact!");
        return;
      }
    });
  });
}

function getContactById(contactId) {
  if (!contactId) {
    console.error("Please write a contactId!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error on reading file!");
      return;
    }
    const contacts = JSON.parse(data);

    if (contacts[contactId]) {
      console.log(`Details for contact at index ${contactId}:`);
      console.table(contacts[contactId]);
    } else {
      console.log(`Contact at index ${contactId} does not exist!`);
    }
  });
}
getContactById();

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
