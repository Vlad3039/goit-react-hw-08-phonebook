import { List, ListItem } from './ContactList.styled';
import { Contact } from './Contact/Contact';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'api/myAPI';

const getContacts = (contacts, filter) => {
  const normalizedFilter = filter.toLowerCase().trim();

  return contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.includes(filter)
  );
};

export const ContactList = () => {
  const filterState = useSelector(state => state.filter);
  const { data, error, isLoading } = useGetContactsQuery();
  return (
    <>
      {error ? (
        <>error</>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : data.length > 0 ? (
        <List>
          {getContacts(data, filterState).map(({ id, name, number }) => (
            <ListItem key={id}>
              <Contact id={id} name={name} number={number} />
            </ListItem>
          ))}
        </List>
      ) : (
        <h2>No contacts yet</h2>
      )}
    </>
  );
};
