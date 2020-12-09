import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';


const start = async () => {
    console.log('Starting....');
    
    if(!process.env.NATS_CLIENT_ID){
        throw new Error ('NATS_CLIENT_ID must be defined');
    }
    if(!process.env.NATS_URL){
        throw new Error ('NATS_URL must be defined');
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error ('NATS_CLUSTER_ID must be defined');
    }
    try{
    
    await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID, 
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL);
        // it is saying that when the process is close
        // has not to wait for it (sending heartbit hoping that it comes back)
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
            });
    
            // when we have an interrupt (like CTRL + C)
            // we try to close the client before killing the process
            process.on('SIGINT', ()  => natsWrapper.client.close());
            process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
} catch(err) {
    console.error(err);
    }

}

start();