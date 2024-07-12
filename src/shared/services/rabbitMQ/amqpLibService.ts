// src/shared/services/rabbitMQ/amqpLibService.ts
import * as amqp from 'amqplib';
import AmqpInterface from './amqpInterface';

class AmqpLibService implements AmqpInterface {
  private connection: amqp.Connection;

  private channel: amqp.Channel;

  constructor() {
    if (!process.env.AMQP_LIB_URL) {
      throw new Error('AMQP_LIB_URL is not defined in .env file.');
    }
  }

  async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(process.env.AMQP_LIB_URL);
      this.channel = await this.connection.createChannel();
    }
  }

  async publishInQueue(queue: string, message: string) {
    await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message));
    // Opcional: Fechar a conexão se necessário
    // this.close();
  }

  async consumeFromQueue(queue: string, callback: (message: string) => void) {
    await this.connect();
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (message) => {
      if (message !== null) {
        console.log('Received message:', message.content.toString());
        callback(message.content.toString());
        this.channel.ack(message);
      }
    });
    // Não fechar a conexão enquanto consumindo
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default AmqpLibService;
