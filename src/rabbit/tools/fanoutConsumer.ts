"use strict";

/**
 *  Servicios de escucha de eventos rabbit
 */
import amqp from "amqplib";
import { RabbitProcessor, IRabbitMessage } from "./common";

export class RabbitFanoutConsumer {
  processors = new Map<string, RabbitProcessor>();

  constructor(private exchange: string) {}

  addProcessor(type: string, processor: RabbitProcessor) {
    this.processors.set(type, processor);
  }

  /**
   * Escucha eventos específicos de cart.
   *
   * article-exist : Es un evento que lo envía Catalog indicando que un articulo existe y es valido para el cart.
   */
  async init() {
    if (!process.env.rabbitUrl) {
      console.log("No se encontro rabbitUrl");

      return;
    }
    try {
      const conn = await amqp.connect(process.env.rabbitUrl);

      const channel = await conn.createChannel();

      channel.on("close", () => {
        console.error(
          "RabbitMQ  " +
            this.exchange +
            "  conexión cerrada, intentado reconecta en 10'"
        );
        setTimeout(() => this.init(), 10000);
      });

      console.log("RabbitMQ  " + this.exchange + "  conectado");

      const exchange = await channel.assertExchange(this.exchange, "fanout", {
        durable: false,
      });

      const queue = await channel.assertQueue("", { exclusive: true });

      channel.bindQueue(queue.queue, exchange.exchange, "");

      channel.consume(
        queue.queue,
        (message) => {
          if (!message) {
            return;
          }
          const rabbitMessage: IRabbitMessage = JSON.parse(
            message.content.toString()
          );
          if (this.processors.has(rabbitMessage.type)) {
            this.processors.get(rabbitMessage.type)!(rabbitMessage);
          }
        },
        { noAck: true }
      );
    } catch (err: any) {
      console.error("RabbitMQ " + this.exchange + " : " + err.message);
      setTimeout(() => this.init(), 10000);
    }
  }
}
