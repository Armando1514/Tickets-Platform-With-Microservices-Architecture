import { Publisher, OrderCreatedEvent, Subjects} from '@armando1514-ticket-system/common';


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

}

