import amqplib from 'amqplib'
import { Queues } from './queues';

interface Event {
    queue: Queues;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract queue: T['queue'];
    protected client: amqplib.Connection;
    private RPC_QUEUE = 'RPC_QUEUE';

    constructor(client: amqplib.Connection) {
        this.client = client;
    }

    async publish(data: T['data']) {

        try {
            const channel = await this.client.createChannel();
            await channel.assertQueue(this.queue, {
                durable: true
            });
            console.log('data', data, this.queue);
            // channel.assertExchange
            channel.sendToQueue(this.queue, Buffer.from(
                JSON.stringify(data)
            ));
        } catch (err) {
            throw err
        }
    }

    // rpc
    async publishAndWaitForData(data: T['data']) {
        return new Promise(async (res, rej) => {
            try {
                const channel = await this.client.createChannel();
                await channel.assertQueue('', {
                    durable: true,
                    exclusive: true,
                });
                const q = await channel.assertQueue('', { exclusive: true });
                const correlationId = this.generateUuid();

                console.log(' [x] Requesting fib(%d)', data);

                channel.consume(q.queue, (msg) => {
                    if (msg?.properties.correlationId === correlationId) {
                        console.log(' [.] Got %s', msg.content.toString());
                        res(msg?.content.toString());
                        // setTimeout(() => {
                        //     connection.close();
                        //     process.exit(0);
                        // }, 500);
                    }
                }, { noAck: true });

                channel.sendToQueue(this.RPC_QUEUE, Buffer.from(JSON.stringify(data)), {
                    correlationId: correlationId,
                    replyTo: q.queue
                });

            } catch (error) {
                console.error("Error:", error);
                rej(error)
            }
        })
    }


    generateUuid() {
        return Math.random().toString() +
            Math.random().toString() +
            Math.random().toString();
    }
}
