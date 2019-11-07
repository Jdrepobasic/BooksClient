import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import queries from '../query/query';

const BookList = () => {
  const { loading, error, data } = useQuery(queries.BOOKS);
  
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <ul id="book-list">
      {
        data.books.map ((item) => {
          return (
            <li key={ item.id }>
              { item.name }
            </li>)
        })
      }
      </ul>
    </div>
  )
}

export default BookList;
