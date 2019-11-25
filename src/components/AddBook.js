import React, { useState, useEffect } from 'react';
import { useQuery, useMutation  } from '@apollo/react-hooks';
import useForm from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import * as yup from 'yup';
import Select from 'react-select';
import queries from '../query/query';
import GenreSelect from './GenreSelect';

const ValidationSchemaYup = yup.object().shape({
  title: yup.string().required(),
  year: yup.number().required().max(2100),
  description: yup.string().required(),
  author: yup.string().required()
})

const AuthorValidationSchemaYup = yup.object().shape({
  authorName: yup.string().required(),
})

const AddBook = () => {

  const { loading, error, data } = useQuery(queries.AUTHORS);
  const [addBook, { data:addData }] = useMutation(queries.ADD_BOOK);
  const [addAuthor] = useMutation(queries.ADD_AUTHOR, {
    refetchQueries: [{query: queries.AUTHORS}]
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: ValidationSchemaYup
  });

  const { register:registerAuthor, handleSubmit:handleSubmitAuthor, errors:errorsAuthor } = useForm({
    validationSchema: AuthorValidationSchemaYup
  });

  const [AuthorsNames, setAuthorsNames] = useState([{value: '', label: ''}]);
  const [AuthorSelected, setAuthorSelected ] = useState("");
  const [GenreSelected, setGenreSelected ] = useState("");
  const [AuthorForm, setAuthorForm ] = useState(false);
  const [AddAuthorBtn, setAddAuthorBtn] = useState("Add Author");

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
    let genres = data.genre.split(',');
    data.genre = genres;
    addBook({ variables: 
      {
        name: data.title, 
        description: data.description, 
        genre: data.genre,
        language: data.language,
        pages: parseInt(data.pages),
        year: parseInt (data.year),
        authorId: data.author
      } 
    })
  };

  const onSubmitAuthor = data => {
    addAuthor({ variables: 
      {
        name: data.authorName, 
        description: data.nationality, 
      } 
    })
  }

  const toggleAuthorForm = () => {
    if (AuthorForm) {
      setAddAuthorBtn("Add Author");
      setAuthorForm(false)
    }
    else {
      setAuthorForm(true)
      setAddAuthorBtn("Close");
    }
  }

  const handleGenres = (e) => {
    if ( e == null ) return setGenreSelected("");
    let genresValue = e.map( item => {
      return item.value;
    })
    setGenreSelected(genresValue);
  }

  const handleAuthors = (e) => {
    if ( e == null ) return setAuthorSelected("");
    setAuthorSelected(e.value);
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} id="bookForm" /> 
      <form onSubmit={handleSubmitAuthor(onSubmitAuthor)} id="authorForm" /> 
      <div>

        <div>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className="text-input" placeholder="Title" ref={register} maxLength="150" form="bookForm"/>
          {errors.title && <ErrorMessage msg="Please enter the book title."/>}
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <input name="year" type="text" className="text-input"  placeholder="Year" ref={register} maxLength="4" form="bookForm"/>
          {errors.year && <ErrorMessage msg="Please enter a year between 1500 and 2100"/>}
        </div>

        <div>
          <label htmlFor="language">Original Language</label>
          <input name="language" type="text" className="text-input" placeholder="Language" ref={register} maxLength="30" form="bookForm"/>
        </div>

        <div>
          <label htmlFor="pages">Pages</label>
          <input name="pages" type="number" className="text-input" placeholder="Number of pages" ref={register} max="10000" form="bookForm"/>
        </div>

        <div>
          <label htmlFor="genre">Genre</label>
          <input name="genre" value={GenreSelected} type="hidden" ref={register} form="bookForm"/>
          <GenreSelect
            handleChange={(e) => handleGenres(e)}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input name="author" value={AuthorSelected} type="hidden" ref={register} form="bookForm"/>
          <Select 
            options={AuthorsNames} 
            isClearable={true}
            isLoading={loading ? true : false}
            onChange={(e) => handleAuthors(e)}
            ref={register}
            isDisabled={AuthorForm}
          />
          {errors.author && <ErrorMessage msg="Please choose an author or create one."/>}
        </div>

        <div>
          <label>Does not have author on list?</label>
          <button onClick={toggleAuthorForm}>{AddAuthorBtn}</button>
        </div>

        { 
          AuthorForm &&
            <div>
              <label>Author Name:</label>
              <input name="authorName" type="text" form="authorForm" ref={registerAuthor}/>
              {errorsAuthor.authorName && <ErrorMessage msg="Please enter an author name."/> }
              <label>Author Nationality:</label>
              <input name="authorNationality" type="text" form="authorForm" ref={registerAuthor}/>
              <input type="submit" value="Save Author" form="authorForm" />
            </div>
        }

        <div>
          <label>Description</label>
          <textarea name="description" className="text-input" placeholder="Description" ref={register} maxLength="450" form="bookForm"/>
          {errors.title && <ErrorMessage msg="Please enter a description for the book."/>}
        </div>

        <input type="submit" value="Add Book" form="bookForm"/>

      </div>
    </React.Fragment>
  )
}

export default AddBook;

