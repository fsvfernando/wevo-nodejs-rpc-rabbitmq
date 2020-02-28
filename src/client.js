const amqp = require('amqplib/callback_api');
const uuid = require('uuid');
const config = require('../config');

const numero = process.argv.slice(2);

amqp.connect(config.rabbitMQConnectionString, (err, conn) => {
  conn.createChannel((err, ch) => {
    ch.assertQueue('', { exclusive: true }, (err, q) => {

      const corr = uuid();
      console.log(` [x] Requesting user ${numero}`);

      ch.consume(q.queue, (msg) => {
        if (msg.properties.correlationId === corr) 
        {
          console.log(` [.] Got ${msg.content.toString()}`);
          setTimeout(function() { conn.close(); process.exit(0) }, 500);
        }
      }, {noAck: true});

      ch.sendToQueue(config.rpcQueue,
        new Buffer(numero.toString()),
        { correlationId: corr, replyTo: q.queue });
    });
  });
});
