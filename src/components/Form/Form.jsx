import { Notify } from 'notiflix';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Box } from 'components/Box/Box';
import { Input, Button, StyledForm } from './Form.styled';

import { useGetContactsQuery, usePostContactMutation } from 'api/myAPI';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /(^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$)/,
      "Name may contain only letters, apostrophe, dash and spaces. For example, 'Adrian', 'Jacob Mercer', 'Charles de Batz de Castelmore d'Artagnan'"
    )
    .required('Add the name, please'),
  number: yup
    .string()
    .matches(
      /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Add the phone number, please'),
});

export const ContactForm = () => {
  const { data } = useGetContactsQuery();

  const [submitForm, { isLoading }] = usePostContactMutation();

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    const some = data.some(
      i => i.name.toLowerCase() === values.name.toLowerCase()
    );
    if (some) {
      return Notify.failure(` ${values.name} is already in contacts`);
    }
    resetForm();
    const { name, number } = values;

    await submitForm({ name, number });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <label htmlFor="name">Name</label>
        <Box display="flex" alignItems="baseline" gridGap={10}>
          <Input name="name" id="name" />
          <ErrorMessage name="name" />
        </Box>

        <label htmlFor="number">Number</label>
        <Box display="flex" alignItems="baseline" gridGap={10}>
          <Input name="number" />
          <ErrorMessage name="number" id="number" />
        </Box>

        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Add....' : 'Add contac'}
        </Button>
      </StyledForm>
    </Formik>
  );
};
