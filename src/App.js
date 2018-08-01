import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount(){
        const config = {
            apiKey: "AIzaSyCSYPtWNAheQyVS950ogXxgeEqtJZB7yPg",
            authDomain: "manager-f35e1.firebaseapp.com",
            databaseURL: "https://manager-f35e1.firebaseio.com",
            projectId: "manager-f35e1",
            storageBucket: "manager-f35e1.appspot.com",
            messagingSenderId: "283711744438"
          };
          firebase.initializeApp(config);
    }

    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
            <Provider store= { store }>
                <Router />
            </Provider>
        );
    }
}

export default App;