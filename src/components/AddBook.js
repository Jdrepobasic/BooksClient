import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import Select from 'react-select';
import queries from '../query/query';
import GenreSelect from './GenreSelect';


const ValidationSchemaYup = yup.object().shape({
  title: yup.string().required(),
  year: yup.number().required().max(2100),
  description: yup.string().required()
})


const AddBook = () => {

  const { loading, error, data } = useQuery(queries.AUTHORS);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: ValidationSchemaYup
  });

  const [AuthorsNames, setAuthorsNames] = useState([{value: '', label: ''}])
  
  useEffect(() => {
    if(data) {
      let authorsData = data;
      authorsData = authorsData.authors.map((item) => {
        return  { value: item.id, label: item.name };
      });
      setAuthorsNames(authorsData);
    }
  }, [data])

  const onSubmit = data => { 
    console.log(data) 
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input name="title" type="text" className="text-input" placeholder="Title" ref={register} maxLength="150"/>
      </div>
      <div>
        <label>Original Language</label>
        <input name="language" type="text" className="text-input" placeholder="Language" ref={register} maxLength="30"/>
      </div>
      <div>
        <label>Pages</label>
        <input name="pages" type="number" className="text-input" placeholder="Number of pages" ref={register} max="5000"/>
      </div>
      <div>
        <label>Genre</label>
        <GenreSelect>

        </GenreSelect>
      </div>
      <div>
        <label>Author</label>
        <Select 
          options={AuthorsNames} 
          isClearable={true}
          isLoading={loading ? true : false}
        />
      </div>
      <div>
        <label>Year</label>
        <input name="year" type="text" className="text-input"  placeholder="Year" ref={register} maxLength="4"/>
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" className="text-input" placeholder="Description" ref={register} maxLength="450"/>
      </div>
      <input type="submit" value="Add Book" />
    </form>
  )
}

export default AddBook;

