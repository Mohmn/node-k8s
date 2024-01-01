
import { app } from './app';
import { rmqWrapper } from './mq-wrapper';

const bootsrtap = async () => {
    if (!process.env.RMQ_URL) {
        throw new Error('RMQ_URL must be defined');
    }

    try {
        await rmqWrapper.connect(process.env.RMQ_URL)
        rmqWrapper.client.on('close', () => {
            console.log('rmq connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => rmqWrapper.client.close());
        process.on('SIGTERM', () => rmqWrapper.client.close());
    } catch (err) {

        console.error(err);
        throw err;
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });
};

(async () => {
    await bootsrtap();
})()
