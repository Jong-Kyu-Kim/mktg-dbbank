const type = require('./type/dbbank');
const input = require('./input/dbbank');

module.exports = `
  scalar Date
  
  type Query {
    ${type.query}
    user: User
  }

  type Mutation {
    ${type.mutation}
    updateUser(id: String, password: String): User    
    signinUser(id: String, password: String): User
    signoutUser: String
  }

  type User {
    _id: String
    id: String
    password: String
    name: String
    dept: String
  }

  ${type.dbbankCustomer}
  ${type.dbbankSetting}
  ${input}
`;
