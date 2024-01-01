import { connect } from 'amqplib';


function fibonacci(n) {
  if (n < 1)
    return 1;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const queue = 'RPC_QUEUE';

async function startWorker() {

  if (!process.env.RMQ_URL) {
    throw new Error('RMQ_URL must be defined');
  }

  try {

    const conn = await connect(process.env.RMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, {
      durable: false
    });

    channel.prefetch(1);
    console.log(' [x] Awaiting RPC requests');
    channel.consume(queue, function reply(msg) {
      const number = parseInt(JSON.parse(msg.content).number);
      const fibNum = fibonacci(number);
      channel.sendToQueue(msg.properties.replyTo,
        Buffer.from(fibNum.toString()), {
        correlationId: msg.properties.correlationId
      });

      channel.ack(msg);
    });
  } catch (err) {
    console.log('error', err);
    throw err;
  }
}


(async () => {
  await startWorker();
})()
