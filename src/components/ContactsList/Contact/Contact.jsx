import PropTypes from 'prop-types';
import { Button } from '../ContactList.styled';

import { useDeleteContactByIdMutation } from 'api/myAPI';
export const Contact = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactByIdMutation();

  return (
    <>
      <p>
        {name}: {number}
      </p>
      <Button onClick={() => deleteContact(id)}>
        {isLoading ? 'Delete....' : 'Delete'}
      </Button>
    </>
  );
};
Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
