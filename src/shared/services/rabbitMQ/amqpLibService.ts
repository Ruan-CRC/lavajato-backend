// src/shared/services/rabbitMQ/amqpLibService.ts
import * as amqp from 'amqplib';
import AmqpInterface from './amqpInterface';

class AmqpLibService implements AmqpInterface {
  private static instance: AmqpLibService;

  private connection: amqp.Connection;

  private channel: amqp.Channel;

  private constructor() {
    if (!process.env.AMQP_LIB_URL) {
      throw new Error('AMQP_LIB_URL is not defined in .env file.');
    }
  }

  public static get Instance(): AmqpLibService {
    if (!AmqpLibService.instance) {
      AmqpLibService.instance = new AmqpLibService();
    }

    return AmqpLibService.instance;
  }

  async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect(process.env.AMQP_LIB_URL);
      this.channel = await this.connection.createChannel();
    }
  }

  async publishInQueue(queue: string, message: any): Promise<boolean> {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    // Opcional: Fechar a conexão se necessário
    // this.close();

    return true;
  }

  async consumeFromQueue(queue: string, callback: (message: string) => void) {
    console.log('Consuming from queue:', queue);
    await this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(queue, (message) => {
      console.log('Message received:', message.content.toString(), message);
      if (message !== null) {
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
