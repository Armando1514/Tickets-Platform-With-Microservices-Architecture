import { Publisher, Subjects, TicketUpdatedEvent} from '@armando1514-ticket-system/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    
    // If I don't specify readonly (final in java)
    // I have to declare Subjects: Subjects.TicketUpdated
    // otherwise typescript is afraid that I can change the value after.
    readonly subject = Subjects.TicketUpdated

}

