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

// const imap = require('./imap')();

mongoose
  .connect(connect.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('> Connected to mongodb server'))
  .catch((error) => console.log(error));

//app.set('secret', 'mKtg');
//app.use(bodyParser.json());
app.use(morgan('common')); // common combined dev short
//app.use(helmet());
app.use(cookieParser());
app.use(express.static(__dirname + '/../dist'));

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    // token: req.headers.authorization.substr(7) || req.cookies.token,
    token: req.cookies.user,
    cookie: (token) => res.cookie('user', token, { httpOnly: true }), // secure: true
    clearCookie: () => res.clearCookie('user', { httpOnly: true }),
    dbbankCustomers: mongoose.model('dbbank_customer', models.dbbankCustomer),
    dbbankNewCustomers: mongoose.model('dbbank_new_customer', models.dbbankCustomer),
    dbbankSettings: mongoose.model('dbbank_setting', models.dbbankSetting),
    users: mongoose.model('user', models.user),
  }),
});

apollo.applyMiddleware({ app, path: '/graphql' });

app.get('/dbbank', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/..', 'dist/dbbank.html'));
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
