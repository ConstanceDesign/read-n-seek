const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  input bookInput {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Query {
    me: User
    users: [User]
    books: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: bookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
