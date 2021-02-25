module.exports = {
  query: `
    dbbankCount(filter: DBBankFilter): Int
    dbbankCustomers(filter: DBBankFilter, sort: [DBBankSort], skip: Int, limit: Int): [DBBankCustomers]
    dbbankTargetItems(filter: DBBankFilter, target: String, skip: Int): [DBBankCustomers]
  `,
  mutation: `
    updateDBBankCustomer(_id: String, target: String, value: String): DBBankCustomers    
    removeDBBankCustomer(_id: String): DBBankCustomers
    concatDBBankCustomer(updateId: String, histories: [DBBankCustomerHistories], deleteId: String): DBBankCustomers
  `,
  dbbankCustomers: `
    type DBBankCustomers {
      _id: String
      name: String
      company: String
      department: String
      position: String
      email: String
      phone: String
      from: String
      note: String
      date: Date
      classification: String
      unsubscribe: Date
      exist: Boolean
      modify: Date
      histories: [DBBankCustomers]
    }
  `
}