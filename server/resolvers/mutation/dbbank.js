const puppeteer = require('puppeteer');
const jwt = require('jsonwebtoken');

module.exports = {
  updateDBBankCustomer: async(obj, args, ctx) => {
    console.log(args)
    const { _id, target, value } = args;
    return await ctx.dbbankCustomers.updateOne( { _id }, { $set: { [target]: value, modify: new Date() } } )
  },

  removeDBBankCustomer: async(obj, args, ctx) => (
    await ctx.dbbankCustomers.deleteOne({ _id: args._id })
  ),

  concatDBBankCustomer: async(obj, args, ctx) => {
    console.log(args)
    return await ctx.dbbankCustomers.updateOne(
      { _id: args.updateId },
      { $set: { histories: args.histories.sort((a, b) => a.date - b.date) } }
    )
  },
}