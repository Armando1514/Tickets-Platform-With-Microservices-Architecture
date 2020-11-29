import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
    title: string,
    price: number,
    userId: string
}


// In future maybe I want add different properties
// that are not related to the user inputs
interface TicketDoc extends mongoose.Document{
    title: string,
    price: number,
    userId: string,
    version: number,
    orderId?: string
}


interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: TicketAttrs) : TicketDoc;
}

const ticketSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
    }
}, {
    toJSON : {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

// change the field __v to version to list out the version for each instance 
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);


ticketSchema.statics.build = (attrs: TicketAttrs) => {

    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export {Ticket};