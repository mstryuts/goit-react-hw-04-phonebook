import { useState, useEffect } from 'react';

import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Section from './Section/Section';
import { Notify } from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = newContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      Notify.warning(`${newContact.name} is already in contactlist.`);
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
    Notify.success(`${newContact.name} is already in contactlist.`);
  };
  console.log(contacts);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };
  const deleteContact = (id, name) => {
    setContacts(s => s.filter(contact => contact.id !== id));

    Notify.warning(`${name} has been deleted.`);
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  return (
    <>
      <Section title={'PhoneBook'}>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
