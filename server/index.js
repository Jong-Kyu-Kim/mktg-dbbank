const express = require('express');
const app = express();
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 4000;
// const dev = process.env.NODE_ENV !== 'production';

const connect = require('./connect');

const mongoose = require('mongoose');
const models = require('./models');

const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');
const morgan = require('morgan');

const moment = require('moment');
//const imap = require('./imap')();

mongoose.connect(connect.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('> Connected to mongodb server'))
  .catch(error => console.log(error))

//app.set('secret', 'mKtg');
//app.use(bodyParser.json());  
app.use(morgan('common')); // common combined dev short
//app.use(helmet());
app.use(cookieParser());
app.use(express.static(__dirname + '/../dist'));

const apollo = new ApolloServer({
  typeDefs, resolvers,
  context: ({ req, res }) => ({
    // token: req.headers.authorization.substr(7) || req.cookies.token,
    token: req.cookies.user,
    cookie: token => res.cookie('user', token, { httpOnly: true }), // secure: true
    clearCookie: () => res.clearCookie('user', { httpOnly: true }),
    dbbankCustomers: mongoose.model('dbbank_customer', models.dbbankCustomer),
    users: mongoose.model('user', models.user),
  })
});  

apollo.applyMiddleware({ app, path: '/graphql' });

app.get('/dbbank', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/..', 'dist/dbbank.html'))
});

app.get('/dbbank-new-customers', async (req, res) => {
  const customers = mongoose.model('dbbank_new_customer', models.dbbankCustomer);
  const dbbankCustomers = mongoose.model('dbbank_customer', models.dbbankCustomer);

  await customers.find({}, (err, doc) => {
    const loop = i => new Promise(async (resolve, reject) => {
      const { _id, name, phone, email, company, department, position, classification, from, note, date, unsubscribe, exist, modify } = doc[i];
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
        exist,
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
          }
        ],
        from,
        count: 1
      }

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

            const loop2 = j => new Promise(async (resolve, reject) => {
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
                    { $set: {
                      name,
                      phone,
                      email,
                      company,
                      department,
                      position,
                      classification,
                      date,
                      unsubscribe,
                      exist,
                      modify,
                      from,
                    }}
                  )                
                }

                // 히스토리 추가
                if (moment(modify).format('YYYY-MM-DD') === '1970-01-01') {
                  await dbbankCustomers.updateOne(
                    { _id: doc._id },
                    { $set: {
                      count: doc.count + 1,
                      histories: doc.histories.concat({
                        name,
                        phone,
                        email,
                        company,
                        department,
                        position,
                        from,
                        note,
                        date,
                      }).sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
                    }}
                  )
                }
              }

              resolve();
            });

            const loop2cont = () => new Promise(async (resolve, reject) => {
              for (let j = 0; j < doc2.length; j++) {
                // break
                await loop2(j);
              }
              resolve();
            });

            loop2cont().then(async () => {            
              if (!arrFilter.length) {
                await dbbankCustomers.create(newCustomer).then(() => {
                  console.log(i);
                  resolve();
                });
              }
              else {
                console.log(arrFilter);
                resolve();
              }
            });
          }

          else {            
            await dbbankCustomers.create(newCustomer).then(() => {
              console.log(i);
              resolve();
            });
          }
        });
      }
      else {        
        await dbbankCustomers.create(newCustomer).then(() => {
          console.log(i);
          resolve();
        });
      }
    });

    const loopcont = async () => {
      for (let i = 0; i < doc.length; i++) {
        await loop(i);
      }
    }

    loopcont();
  });
});

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
});