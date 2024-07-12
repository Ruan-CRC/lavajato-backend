import * as amqp from 'amqplib';
import AmqpInterface from './amqpInterface';

class AmqpLibService implements AmqpInterface {
  private connection: amqp.Connection;

  private channel: amqp.Channel;

  constructor() {
    if (!process.env.AMQP_LIB_URL) {
      throw new Error('AMQP_LIB_URL is not defined in .env file.');
    }
    if (this.connection) {
      return;
    }

    this.connect();
  }

  async connect() {
    this.connection = await amqp.connect(process.env.AMQP_LIB_URL);
    this.channel = await this.connection.createChannel();
  }

  async publishInQueue(queue: string, message: string) {
    this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(message));

    this.close();
  }

  async consumeFromQueue(queue: string, callback: (message: string) => void) {
    this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (message) => {
      if (message !== null) {
        console.log('Received message:', message.content.toString());
        callback(message.content.toString());
        this.channel.ack(message);
      }
    });

    this.close();
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

export default AmqpLibService;
