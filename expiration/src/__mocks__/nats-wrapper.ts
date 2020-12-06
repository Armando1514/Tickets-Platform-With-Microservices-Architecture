export const natsWrapper = {
    client: {

        // jest.fn return  a new function and replace publish function
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback:() => void) => {
                callback();
        })
    }
};