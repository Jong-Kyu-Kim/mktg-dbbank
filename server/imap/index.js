const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;
const mongoose = require('mongoose');
const connect = require('../connect');
const models = require('../models');

const imap = new Imap(connect.imap);

module.exports = () => {
  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) console.log(err);

      // imap.on('mail', (numNewMsgs) => {
      // console.log(numNewMsgs + " messages has arrived");

      // imap.search([ ['HEADER', 'from', 'webmaster'] ], (err, results) => {
      // imap.search([['UNSEEN'], ['HEADER', 'from', 'postmaster@sp-ace']], (err, results) => {
      imap.search([['UNSEEN']], (err, results) => {
        if (err) console.log(err);

        console.log(results.length);

        if (results.length > 0) {
          const f = imap.fetch(results, {
            // bodies: ['HEADER.FIELDS (from subject date text)'],
            bodies: '',
            //struct: true
          });

          f.on('message', (msg, seqno) => {
            // console.log('Message #%d', seqno);
            // const prefix = '(#' + seqno + ') ';

            msg.on('body', (stream, info) => {
              simpleParser(stream).then(async (parsed) => {
                const from = parsed.headers.get('from').value[0].address;
                const subject = parsed.headers.get('subject');
                const date = parsed.headers.get('date');

                let email;

                // 수신거부 신청 처리
                // if (from.indexOf('webmaster') >= 0) {
                //   const str = (string, num) => string.substr(num, string.length - num);
                //   const srj = val => val.split('').reverse().join('');

                //   if (from === 'webmaster@fasoo.com') {
                //     email = subject.substr(10, subject.length - 10).toLowerCase();
                //   }

                //   if (from === 'webmaster@naver.com' && parsed.html.indexOf('수신차단') > 0) {
                //     email = srj(str(srj(str(subject, 10)), 18));
                //   }

                //   if (from === 'webmaster@nate.com' && parsed.html.indexOf('수신차단') > 0) {
                //     email = srj(str(srj(str(subject, 9)), 18));
                //   }

                //   if (email) {
                //     console.log(email);

                // await imap.move(results, 'Unsubscribe', err => {
                //   if (err) console.log(err)
                // });

                //     await mongoose.model('dbbank_customer', models.dbbankCustomer).updateMany(
                //       { email },
                //       { $set: { unsubscribe: new Date(date) }
                //     });
                //   }
                // }

                //console.log(JSON.stringify(parsed, null, 2))

                //console.log(JSON.stringify(parsed, null, 2));

                // 리턴메일 처리
                if (typeof parsed.text === 'string') {
                  let returned;

                  // if (parsed.from.text === 'postmaster@sp-ace' && parsed.text.indexOf('returned') >= 0) {
                  //   email = parsed.html.substring(parsed.html.indexOf('<a href="'), parsed.html.indexOf('</a>')).split('>')[1];
                  //   returned = parsed.text.substring(parsed.text.indexOf("'<") + 2, parsed.text.indexOf(">'")).replace(/\n/gi, ' ');
                  // }

                  // if (subject === '[Delivery Failure] 메일 전송 실패') {
                  //   email = parsed.text.substring(parsed.text.indexOf('Receiver: ') + 10, parsed.text.indexOf('Subject:')).replace(/\n/gi, ' ');
                  //   returned = parsed.text.substring(parsed.text.indexOf('Status: ') + 8, parsed.text.length - 1).replace(/\n/gi, ' ');

                  //   if (email) {
                  //     console.log(email);
                  //     console.log(returned);
                  //     console.log(date);

                  //     await mongoose.model('dbbank_customer', models.dbbankCustomer).updateOne({ email }, { $set: { returned } });
                  //   }
                  // }

                  email = parsed.text.substring(parsed.text.indexOf('To: ') + 4, parsed.text.indexOf('Subject:')).replace(/\n/gi, ' ');
                  returned = parsed.text.substring(parsed.text.indexOf('>>>') + 3, parsed.text.indexOf('******************** Message')).replace(/\n/gi, ' ');

                  if (email) {
                    console.log(email);
                    console.log(returned);
                    console.log(date);

                    await mongoose.model('dbbank_customer', models.dbbankCustomer).updateOne({ email }, { $set: { returned } });
                  }

                  // email = parsed.html.substring(parsed.html.indexOf('<a href="'), parsed.html.indexOf('</a>')).split('>')[1];
                  // returned = parsed.text.substring(parsed.text.indexOf("'<") + 2, parsed.text.indexOf(">'")).replace(/\n/gi, ' ');

                  // email = parsed.text.substring(parsed.text.indexOf('<b>') + 3, parsed.text.indexOf('</b>')).replace(/\n/gi, ' ');
                  // returned = parsed.text.substring(parsed.text.indexOf("'>>") + 2, parsed.text.indexOf(">'")).replace(/\n/gi, ' ');

                  // if (parsed.subject === 'Delivery failure') {
                  //   email = parsed.textAsHtml.substring(parsed.textAsHtml.indexOf('<a href="'), parsed.textAsHtml.indexOf('</a>')).split('>')[1];
                  //   returned = parsed.text.substring(parsed.text.indexOf('Remote host said[Response Message]: ') + 36, parsed.text.indexOf('STEP')).replace(/\n/gi, ' ');

                  //   if (email) {
                  //     console.log(email);
                  //     console.log(returned);
                  //     console.log(date);

                  //     await mongoose.model('dbbank_customer', models.dbbankCustomer).updateOne({ email }, { $set: { returned } });
                  //   }
                  // }
                }
              });

              // let buffer = '';
              // stream.on('data', chunk => buffer += chunk.toString('utf8'));
              // stream.once('end', () => {
              //   console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
              // });
            });

            // msg.once('attributes', (attrs) => {
            //   console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
            // });

            // msg.once('end', () => {
            //   //console.log(prefix + 'Finished');
            // });
          });

          f.once('error', (err) => console.log('Fetch error: ' + err));
          f.once('end', () => {
            //imap.end();
          });
        }

        imap.move(results, 'Returned', (err) => {
          if (err) console.log(err);
        });
      });
      // });
    });
  });

  imap.once('error', (err) => console.log(err));
  imap.once('end', () => console.log('Connection ended'));

  imap.connect();
};
