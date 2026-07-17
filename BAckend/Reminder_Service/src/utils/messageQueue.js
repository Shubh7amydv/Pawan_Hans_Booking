const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME } = require('../Config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        console.log("Error creating RabbitMQ channel in Reminder Service:", error);
        throw error;
    }
}

const subscribeMessage = async (channel, service, bindingKey) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);
        
        channel.consume(applicationQueue.queue, msg => {
            if (msg !== null) {
                console.log('Received message from queue in Reminder Service:');
                console.log(msg.content.toString());
                const payload = JSON.parse(msg.content.toString());
                service(payload);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.log("Error subscribing to message queue in Reminder Service:", error);
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage
}
