const amqp = require('amqplib/callback_api');
const config = require('../config');

amqp.connect(config.rabbitMQConnectionString, (err, conn) => {
  conn.createChannel((err, ch) => {

    ch.assertQueue(config.rpcQueue, { durable: false });
    ch.prefetch(1);

    console.log(' [x] Awaiting RPC requests');

    ch.consume(config.rpcQueue, function reply(msg) {
      const num = parseInt(msg.content.toString(), 10);
      let msgReturn = "";
      if (numberIsPrime(num) == true)
      {
          msgReturn = `The number ${num} is prime`;
      }
      else
      {
          msgReturn = `The number ${num} is not prime`;
      }
      console.log(msgReturn);

      let optionsPublish = { 
        correlationId: msg.properties.correlationId 
      };
      ch.sendToQueue(
          msg.properties.replyTo,
          new Buffer(`Result: ${msgReturn}`),
          optionsPublish
      );

      ch.ack(msg);
    });
  });
});

function numberIsPrime(num) {
  // verifica se o numero digitado é "1", que não é primo
  if(num!=1){
    for (var i = 2; i < num; i++)
      if (num % i == 0) return false;
    return num !== 1;
  }
}