import { Input } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { change } from 'redux/filterSlice';
import { selectFilters } from 'redux/selector';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilters);

  return (
    <>
      <label htmlFor="filter">Find a contact by name</label>
      <Input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={e => dispatch(change(e.target.value))}
      />
    </>
  );
};
