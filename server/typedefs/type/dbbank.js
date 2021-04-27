module.exports = {
  query: `
    dbbankCount(filter: DBBankFilter): Int
    dbbankNewCustomers: Int
    dbbankCustomers(filter: DBBankFilter, sort: [DBBankSort], skip: Int, limit: Int): [DBBankCustomer]
    dbbankTargetItems(filter: DBBankFilter, target: String, skip: Int): [DBBankCustomer]
    dbbankSettings(_id: String, target: String, name: String value: String): [DBBankSetting]
  `,
  mutation: `
    addDBBankCustomers: [DBBankCustomer]
    updateDBBankCustomer(_id: String, target: String, value: String): DBBankCustomer    
    removeDBBankCustomer(_id: String): DBBankCustomer
    concatDBBankCustomer(updateId: String, histories: [DBBankCustomerHistory], deleteId: String): DBBankCustomer    
    createDBBankSetting(target: String, name: String, value: String, order: Int): DBBankSetting
    updateDBBankSetting(_id: String, target: String, name: String, value: String, order: Int, inc: Int): DBBankSetting
    removeDBBankSetting(_id: String): DBBankSetting
  `,
  dbbankCustomer: `
    type DBBankCustomer {
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
      returned: String
      modify: Date
      histories: [DBBankCustomer]
    }
  `,
  dbbankSetting: `
    type DBBankSetting {
      _id: String
      target: String
      name: String
      value: String
      order: Int
    }
  `,
};
