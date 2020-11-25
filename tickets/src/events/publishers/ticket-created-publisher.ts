import { Publisher, Subjects, TicketCreatedEvent} from '@armando1514-ticket-system/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    
    // If I don't specify readonly (final in java)
    // I have to declare Subjects: Subjects.TicketCreated
    // otherwise typescript is afraid that I can change the value after.
    readonly subject = Subjects.TicketCreated;

}

