import amqplib from 'amqplib'
class RMqWrapper {
    private _client?: amqplib.Connection;

    get client() {
        if (!this._client) {
            throw new Error('Cannot access rabbit mq client before connecting');
        }

        return this._client;
    }

    //   connect(clusterId: string, clientId: string, url: string) {
    async connect(url: string) {
        try {
            this._client = await amqplib.connect(url);
        } catch (error) {
            throw error
        }
    }
}

export const rmqWrapper = new RMqWrapper();
