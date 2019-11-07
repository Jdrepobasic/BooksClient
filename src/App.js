import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

import BookList from './components/BookList';
import AddBook from './components/AddBook';


// apollo client setup

const client = new ApolloClient({
  uri:'https://dv-api-books.herokuapp.com/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Book list recommendation</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
