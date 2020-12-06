import { Subjects, Publisher, ExpirationCompleteEvent} from '@armando1514-ticket-system/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}