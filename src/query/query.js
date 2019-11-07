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
  `
}

export default queries;
