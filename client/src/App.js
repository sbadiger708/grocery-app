import React, { Component } from 'react';
import Login from './components/Login/Login';
import { verifyToken } from './services/userService';
import { Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import History from './components/History/History';
import LoadingIndicator from './components/Loader/LoadingIndicator';
import Grocery from './components/Grocery/Grocery';

class App extends Component {
    state = {
        busyIndicator: true,
        loggedIn: false,
        userContext: {
            name: '',
            email: '',
            id: ''
        }
    }

    isLoggedIn = () => {
        if(localStorage.getItem('token')) {
            verifyToken().then(({ data }) => {
                this.setState({loggedIn: true, userContext: data, busyIndicator: false});
            }).catch(() => this.setState({loggedIn: false, busyIndicator: false}));
        }else {
            this.setState({loggedIn: false, busyIndicator: false});
        }
    }

    componentDidMount() {
        this.isLoggedIn()
    }

    render() {
        const { loggedIn, userContext, busyIndicator } = this.state;
        console.log(loggedIn, userContext);
        if(busyIndicator) {
            return <LoadingIndicator/>
        }
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/home" render={(props) => <Home {...{ loggedIn, userContext }} {...props}/>}/>
                <Route exact path="/admin/grocery" render={(props) => <Grocery {...{ loggedIn, userContext }} {...props}/>}/>
                <Route exact path="/cart" render={(props) => <Cart {...{ loggedIn, userContext }} {...props}/>}/>
                <Route exact path="/history" render={(props) => <History {...{ loggedIn, userContext }} {...props}/>}/>
            </Switch>
        )
    }
}

export default App;
