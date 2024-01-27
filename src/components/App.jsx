import React, { useState, useEffect } from 'react';
import { FormAddContacts } from './Contactform';
import { nanoid } from 'nanoid';
import { ContactsList } from './Contactlist';
import { Filter } from './Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (contact, callbackCleanForm) => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    const isContact = contacts.some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (isContact) {
      alert('Is already in contacts!');
      callbackCleanForm();
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
    callbackCleanForm();
  };

  const handleChange = ev => {
    const { value } = ev.target;
    setFilter(value);
  };

  const handleDeleteContact = e => {
    const idBtn = e.target.id;
    const newContacts = contacts.filter(({ id }) => id !== idBtn);
    setContacts(newContacts);
  };

  const arreyContactsFiltered = () =>
    contacts.filter(
      ({ name }) =>
        !filter || name.toLowerCase().includes(filter.trim().toLowerCase())
    );

  return (
    <div className="maine_box ">
      <h1 className="h1 mt-2">Phonebook</h1>
      <FormAddContacts handleAddContact={handleAddContact} />
      <h2 className="h2 mt-3">Contacts</h2>
      <Filter state={filter} handleChange={handleChange} />
      <ContactsList
        array={arreyContactsFiltered()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export { App };
