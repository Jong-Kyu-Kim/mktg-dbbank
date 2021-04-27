const mongoose = require('mongoose');
const moment = require('moment');

module.exports = {
  addDBBankCustomers: async (obj, args, ctx) => {
    const { dbbankNewCustomers, dbbankCustomers } = ctx;

    return await dbbankNewCustomers.find({}, async (err, doc) => {
      await dbbankNewCustomers.deleteMany();

      const loop = (i) => {
        return new Promise(async (resolve, reject) => {
          const { _id, name, phone, email, company, department, position, classification, from, note, date, unsubscribe, returned, modify } = doc[i];
          const newCustomer = {
            _id,
            name,
            phone,
            email,
            company,
            department,
            position,
            classification,
            date,
            unsubscribe,
            returned,
            modify,
            histories: [
              {
                name,
                phone,
                email,
                company,
                department,
                position,
                from,
                note,
                date,
              },
            ],
            from,
            count: 1,
          };

          // 판단 가능 여부
          // 이름 O 번호 O 메일 O  => O
          // 이름 O 번호 O 메일 X  => O
          // 이름 O 번호 X 메일 O  => O
          // 이름 O 번호 X 메일 X  => X 동명이인

          // 이름 X 번호 O 메일 O  => O
          // 이름 X 번호 O 메일 X  => O
          // 이름 X 번호 X 메일 O  => O
          // 이름 X 번호 X 메일 X  => X

          if (phone || email) {
            await dbbankCustomers.find({}, async (err, doc2) => {
              if (doc2.length) {
                let arrFilter = [];

                const loop2 = (j) => {
                  return new Promise(async (resolve, reject) => {
                    const doc = doc2[j];

                    // 동일 인물 조건
                    const isEqualNameAndPhone = doc.name === name && doc.phone === phone && phone !== '';
                    const isEqualNameAndEmail = doc.name === name && doc.email === email && email !== '';
                    const isEqualPhoneAndEmail = doc.phone === phone && doc.email === email;
                    const isEqualCustomer = isEqualNameAndPhone || isEqualNameAndEmail || isEqualPhoneAndEmail;

                    if (isEqualCustomer) {
                      arrFilter.push(doc);

                      // 최신 정보 업데이트
                      if (modify > doc.date || (date > doc.date && date > doc.modify)) {
                        await dbbankCustomers.updateOne(
                          { _id: doc._id },
                          {
                            $set: {
                              name,
                              phone,
                              email,
                              company,
                              department,
                              position,
                              classification,
                              date,
                              unsubscribe,
                              returned,
                              modify,
                              from,
                            },
                          }
                        );
                      }

                      // 히스토리 추가
                      if (moment(modify).format('YYYY-MM-DD') === '1970-01-01') {
                        await dbbankCustomers.updateOne(
                          { _id: doc._id },
                          {
                            $set: {
                              count: doc.count + 1,
                              histories: doc.histories
                                .concat({
                                  name,
                                  phone,
                                  email,
                                  company,
                                  department,
                                  position,
                                  from,
                                  note,
                                  date,
                                })
                                .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
                            },
                          }
                        );
                      }
                    }

                    resolve();
                  });
                };

                const loop2cont = () => {
                  return new Promise(async (resolve, reject) => {
                    for (let j = 0; j < doc2.length; j++) {
                      // break
                      await loop2(j);
                    }
                    resolve();
                  });
                };

                loop2cont().then(async () => {
                  if (!arrFilter.length) {
                    await dbbankCustomers.create(newCustomer).then(() => {
                      console.log(i);
                      resolve();
                    });
                  } else {
                    console.log(arrFilter);
                    resolve();
                  }
                });
              } else {
                await dbbankCustomers.create(newCustomer).then(() => {
                  console.log(i);
                  resolve();
                });
              }
            });
          } else {
            await dbbankCustomers.create(newCustomer).then(() => {
              console.log(i);
              resolve();
            });
          }
        });
      };

      const loopcont = async () => {
        for (let i = 0; i < doc.length; i++) {
          await loop(i);
        }
      };

      loopcont();
    });
  },

  updateDBBankCustomer: async (obj, args, ctx) => {
    console.log(args);
    const { _id, target, value } = args;
    return await ctx.dbbankCustomers.updateOne({ _id }, { $set: { [target]: value, modify: new Date() } });
  },

  removeDBBankCustomer: async (obj, args, ctx) => await ctx.dbbankCustomers.deleteOne({ _id: args._id }),

  concatDBBankCustomer: async (obj, args, ctx) => {
    console.log(args);
    return await ctx.dbbankCustomers.updateOne(
      { _id: args.updateId },
      {
        $set: {
          histories: args.histories.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)),
          count: args.histories.length,
        },
      }
    );
  },

  createDBBankSetting: async (obj, args, ctx) => {
    return await new ctx.dbbankSettings({
      ...args,
      _id: new mongoose.mongo.ObjectId(),
    }).save();
  },

  updateDBBankSetting: async (obj, args, ctx) => {
    const { _id, target, name, value, order, inc } = args;

    // 자신 이외의 순서 변경
    if (inc !== 0) {
      if (Math.abs(inc) === 1) {
        await ctx.dbbankSettings.updateOne({ target, order: order + inc }, { $inc: { order: inc * -1 } });
      } else {
        await ctx.dbbankSettings.updateMany({ _id: { $not: { $eq: _id } }, target, order: { [order + inc === 0 ? '$lt' : '$gt']: order } }, { $inc: { order: order + inc === 0 ? 1 : -1 } });
      }
    }

    return await ctx.dbbankSettings.updateOne({ _id }, { $set: { target, name, value }, $inc: { order: inc } });
  },

  removeDBBankSetting: async (obj, args, ctx) => {
    return await ctx.dbbankSettings.findOne({ _id: args._id }, async (err, result) => {
      await ctx.dbbankSettings.updateMany({ order: { $gt: result.order } }, { $inc: { order: -1 } });
      await ctx.dbbankSettings.deleteOne({ _id: args._id });
    });
  },
};
