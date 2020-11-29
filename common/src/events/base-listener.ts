import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects,
    data: any
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], message: Message): void;

    protected client: Stan;
    protected ackWait = 5 * 1000;


    constructor(client: Stan) {
        this.client = client;
    }
// By default when you receive the event, the even is deleted.
 // setting setManualAckMode the acknowledge message is manual.
 // if after 30 seconds, doesn't receive the acknowledge, the NATS
 // Will send to other services in queue-group or again to the same service
    subscriptionOptions() {
        return this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueGroupName);
    }

    listen(){
            // subscribe to the channel "ticket:created"
        const subscription = this.client.subscribe (
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        )

            // listen to subscription when is received a new message (event)
        subscription.on('message', (msg:Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));

    }
}