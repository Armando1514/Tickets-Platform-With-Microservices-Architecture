import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, validateRequest, OrderStatus, BadRequestError } from '@armando1514-ticket-system/common'
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const EXPIRATION_WINDOWS_SECONDS = 1 * 60;

router.post('/api/orders', 
requireAuth, 
[
  body('ticketId')
    .not()
    .isEmpty()
    .custom( (input : string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
],
 validateRequest,
 async(req: Request, res: Response) => {

    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if ( !ticket ) {
      throw new NotFoundError();
    }

    // Make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if(isReserved) {
      throw new BadRequestError('Ticket is already reserved');
    }
    // Calculate an exploration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOWS_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket
    });
    
    await order.save();

    // Publish an event saying that the order is created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(), //UTC TIMEZONE
      ticket: {
        id: ticket.id,
        price: ticket.price
      },
      version: order.version
    });

    res.status(201).send(order);
});

export { router as newOrderRouter };