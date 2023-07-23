import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form';
import { ContactsList } from './ConactsList';
import { Filter } from './Filter';

const LS_KEY = 'addContact';

export function PhoneBook() {
  const [contacts, setContacts] = useState(
    JSON.parse(
      window.localStorage.getItem(LS_KEY)) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const repeatContact = contacts.filter((el) => el.name === data.name);
    repeatContact.length > 0
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevState => {
        return [
            { id: nanoid(), name: data.name, number: data.number },
            ...prevState,
          ];
      });
  };

  const onDeleteContact = id => {
    setContacts((prevState) => {
      return prevState.filter(contact => contact.id !== id)
    })
  };

  const changeFilter = e => {
    setFilter(e.target.value );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList
        contacts={getVisibleContacts()}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
}
