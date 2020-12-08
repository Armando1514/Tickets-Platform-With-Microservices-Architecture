import { Subjects, Publisher, PaymentCreatedEvent } from '@armando1514-ticket-system/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}