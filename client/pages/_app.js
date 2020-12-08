import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
    <div>
    <Header currentUser = {currentUser} />
    <div className = "container">
    <Component currentUser = {currentUser} {...pageProps} />
    </div>
    </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    // Calling the getInitialProps of the others component
    // otherwise by default this is the only one executed
    if(appContext.Component.getInitialProps){

      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  
    }

    // show up in the app component upstair 
    // and throw to all the components
    return {
        pageProps,
        currentUser: data.currentUser
    };
};

export default AppComponent;