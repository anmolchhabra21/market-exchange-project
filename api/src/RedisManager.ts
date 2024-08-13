
import { RedisClientType, createClient } from "redis";
import { OrderbookMessage, MessageToEngine } from "./types";

export class RedisManager {
    private client: RedisClientType;
    private publisher: RedisClientType;
    private static instance: RedisManager;

    private constructor() {
        this.client = createClient();
        this.client.connect();
        this.publisher = createClient();
        this.publisher.connect();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new RedisManager();
        }
        return this.instance;
    }

    /*

    This is the brute force and clearly doesn't work.

    public sendAndAwait(message){
        const id = this.getRandomClientId();
        this.publisher.push("messages", JSON.stringify({ clientId: id, message }));

        const message = await this.client.subscribe(id);
        return JSON.parse(message);
    }

    so we need to use a promise to wait for the message to arrive
    */

    public sendAndAwait(message: MessageToEngine) {
        return new Promise<OrderbookMessage>((resolve) => {
            const id = this.getRandomClientId();
            this.client.subscribe(id, (message) => {
                this.client.unsubscribe(id);
                resolve(JSON.parse(message));
            });
            this.publisher.lPush("messages", JSON.stringify({ clientId: id, message }));
        });
    }

    public getRandomClientId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}