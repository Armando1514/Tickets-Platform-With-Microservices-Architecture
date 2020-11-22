import axios from 'axios';

// is server-side executed, except when
// swap from one page to another while in the app.
export default ( { req } ) => {
    
     // window is an object that exists only
    // in the browser environment,
    // not in the node.js server. 
    // So you can understand if the rendering
    // is happening client-side or server-side
    if(typeof window === 'undefined'){
        // we are on the server
        // request should be made to 
        // http://SERVICENAME.NAMESPACE.svc.cluster.local
        return axios.create( { 
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });

    } else
    {
        // we are on the browser
        // requests can be made with a base 
        // url of '' the browser can provide us
        // the base domain.

        return axios.create( {
            baseUrl: '/'
        });
    }

}