import { Publisher, OrderCancelledEvent, Subjects} from '@armando1514-ticket-system/common';


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

}

