import { gql } from 'apollo-boost';

const queries = {  
  BOOKS: gql`
    {
      books {
        id
        name
        genre
        year
        description
        author {
          name
          nationality
        }
      }
    }
  `,
  AUTHORS: gql`
    {
      authors {
        name
        nationality
        id
      }
    }
  `,
  ADD_BOOK: gql`
  mutation AddBook($name: String!, $description: String!, $language: String, $pages: Int, $year: Int, $genre: [String], $authorId:ID ) {
    addBook(name: $name, description: $description, language: $language, pages: $pages, year: $year, genre: $genre, authorId: $authorId) {
      name
      description
      language
      pages
      year
      genre
      authorId
    }
  }
  `,
  ADD_AUTHOR: gql`
  mutation AddBook($name: String!, $nationality: String ) {
    addAuthor(name: $name, nationality: $nationality) {
      name
      nationality
    }
  }
  `
}

export default queries;
