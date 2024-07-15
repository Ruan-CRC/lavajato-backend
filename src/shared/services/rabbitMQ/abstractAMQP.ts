import * as amqp from 'amqplib';

abstract class AbstractAMQP {
  protected connection: amqp.Connection | null = null;

  protected channel: amqp.Channel | null = null;

  protected queue: string;

  constructor(queue: string) {
    if (!process.env.RABBITMQ_URL) {
      throw new Error('RABBITMQ_URL is not defined in .env file.');
    }
    this.queue = queue;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
    }
  }

  public async publish(message: any): Promise<boolean> {
    await this.connect();
    if (this.channel) {
      await this.channel.assertQueue(this.queue, { durable: true });
      this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
    }
    return true;
  }

  public async consume(callback: (message: any) => void): Promise<void> {
    await this.connect();
    if (this.channel) {
      await this.channel.assertQueue(this.queue, { durable: true });
      this.channel.consume(this.queue, (message) => {
        if (message !== null) {
          callback(JSON.parse(message.content.toString()));
          this.channel.ack(message);
        }
      });
    }
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}

export default AbstractAMQP;
