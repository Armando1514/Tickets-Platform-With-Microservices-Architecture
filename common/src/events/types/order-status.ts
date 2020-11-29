export enum OrderStatus {
    // When the order has been created,
    // but the ticket is is trying to order has not been reserved
    Created = 'created',

    // The ticket the order is trying to reserve has already
    // been reserved, or when the user has cancelled the order.
    // The order expires before payment
    Cancelled = 'cancelled',

    // The order has succesfully reserved the ticket
    AwaitingPayment = 'awaiting:payment',

    // The order has reseved the ticket and the user has
    // provided payment successfully
    Complete = 'complete'
}