import { Component } from 'react';
import { FormAddContacts } from './Contactform';
import { nanoid } from 'nanoid';
import { ContactsList } from './Contactlist';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = (contact, callbackCleanForm) => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    const isContact = this.state.contacts.some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (isContact) {
      alert('Is already in contacts!');
      callbackCleanForm();
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });

    callbackCleanForm();
  };

  handleChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  handleDeleteContact = e => {
    const idBtn = e.target.id;
    const newContacts = this.state.contacts.filter(({ id }) => id !== idBtn);
    this.setState({ contacts: newContacts });
  };

  arreyContactsFiltered = () =>
    this.state.contacts.filter(
      ({ name }) =>
        !this.state.filter ||
        name.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );

  render() {
    return (
      <div className="maine_box ">
        <h1 className="h1 mt-2">Phonebook</h1>
        <FormAddContacts handleAddContact={this.handleAddContact} />
        <h2 className="h2 mt-3">Contacts</h2>
        <Filter state={this.state} handleChange={this.handleChange} />
        <ContactsList
          array={this.arreyContactsFiltered()}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
