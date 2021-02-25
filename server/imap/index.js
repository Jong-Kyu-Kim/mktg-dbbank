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
  
      imap.on('mail', numNewMsgs => {
        // console.log(numNewMsgs + " messages has arrived");                

        // imap.search([ ['HEADER', 'from', 'webmaster'] ], (err, results) => { // 수신거부
        imap.search([ ['UNSEEN'], ['HEADER', 'from', 'postmaster@sp-ace'] ], (err, results) => { // 리턴메일
          if (err) console.log(err);
  
          console.log(results.length)
                  
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
                simpleParser(stream).then(async parsed => {                
                  const from = parsed.headers.get('from').value[0].address;
                  const subject = parsed.headers.get('subject');
                  const date = parsed.headers.get('date');

                  if (from === 'postmaster@sp-ace') {
                    const email = parsed.html.substring(parsed.html.indexOf('<a href="'), parsed.html.indexOf('</a>')).split('>')[1];
                    console.log(email)
                  }

                  // 수신거부 신청 처리
                  // if (from.indexOf('webmaster') >= 0) {
                  //   const str = (string, num) => string.substr(num, string.length - num);
                  //   const srj = val => val.split('').reverse().join('');
                  //   let email;

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

                  //     await mongoose.model('dbbank_customer', models.dbbankCustomer).updateMany(
                  //       { email },
                  //       { $set: { unsubscribe: new Date(date) }
                  //     });   
                  //   }                 
                  // }
  
                  // 리턴메일 처리
                  if (parsed.html && parsed.text && parsed.text.indexOf('returned')) {
                    const email = parsed.html.substring(parsed.html.indexOf('<a href="'), parsed.html.indexOf('</a>')).split('>')[1];
                    const returned = parsed.text.substring(parsed.text.indexOf("'<") + 2, parsed.text.indexOf(">'")).replace(/\n/gi, ' ');

                    if (email) {
                      console.log(email)
                      // console.log(returned)
                      // console.log(date)

                      // await imap.move(results, 'Returned', err => {
                      //   if (err) console.log(err)
                      // });
    
                      // await mongoose.model('dbbank_customer', models.dbbankCustomer).updateOne(
                      //   { email },
                      //   { $set: { returned }
                      // })
                    }
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
        
            f.once('error', err => console.log('Fetch error: ' + err));
            f.once('end', () => {
              //imap.end();
              // imap.move(results, 'Unsubscribe', err => {
              //   if (err) console.log(err)
              // });
            });          
          }
        })    
      })
    })
  });
    
  imap.once('error', err => console.log(err));
  imap.once('end', () => console.log('Connection ended'));
  
  imap.connect();
}