interface AmqpInterface {
  publishInQueue(queue: string, message: string): void;
  consumeFromQueue(queue: string, callback: (message: string) => void): void;
}

export default AmqpInterface;
