module.exports = `
  input DBBankTarget {    
    history: Boolean
    include: Boolean
    keyword: String
    items: [String]
  }

  input DBBankTargetDate {
    history: Boolean
    fromDate: String
    toDate: String
  }  

  input DBBankFilter {
    skip: Int
    limit: Int
    history: Boolean
    keyword: String
    unsubscribe: Boolean
    returned: Boolean
    name: DBBankTarget
    company: DBBankTarget
    department: DBBankTarget
    position: DBBankTarget
    email: DBBankTarget
    phone: DBBankTarget
    classification: DBBankTarget
    from: DBBankTarget
    date: DBBankTargetDate
    note: DBBankTarget
  } 

  input DBBankSort {
    name: Int
    company: Int
    department: Int
    position: Int
    email: Int
    phone: Int
    classification: Int
    from: Int
    date: Int
    unsubscribe: Int
    count: Int
  }

  input DBBankCustomerHistories {
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
    modify: Date
  }
`