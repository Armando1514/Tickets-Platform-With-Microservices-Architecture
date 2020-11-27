import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@armando1514-ticket-system/common'


it('returns an error if the ticket does not exist', async() => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
          .post('/api/orders')
          .set('Cookie', global.signin())
          .send( {
              ticketId: ticketId
          }).expect(404);
});

it('returns an error if the ticket is already reserved', async() => {
   
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build( {
        ticket,
        userId: 'sdadsawe',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });

    await order.save();
    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send( { ticketId: ticket.id })
        .expect(400);
});

it('reserves a ticket', async() => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.signin())
        .send( {ticketId: ticket.id})
        .expect(201);
});