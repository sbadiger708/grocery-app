import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import './Login.css';
import { loginUser } from '../../services/userService';
import LoadingIndicator from '../Loader/LoadingIndicator';

class Login extends Component {
    state = {
        busyIndicator: false,
        authUser: {
            email: '',
            password: ''
        },
        error: false,
        errMessage: ''
    }

    handleChange = (event, data) => {
        const { name, value } = data;
        const { authUser } = this.state;
        authUser[name] = value;
        this.setState({ authUser });
    }    

    loginUser = () => {
        const { authUser } = this.state;
        this.setState({busyIndicator: true});
        loginUser(authUser)
        .then(({ data }) => {
            if(data.success) {
                localStorage.setItem('token', data.jwtToken)
                this.setState({busyIndicator: false, error: false});
                window.location.href = '/home';
            }else {
                this.setState({busyIndicator: false, error: true, errMessage: data.message});
            }
            
        })
        .catch((err) =>  {
            console.log(err);
            this.setState({busyIndicator: false})
        });
    }


    render() {
        const { busyIndicator,authUser, error, errMessage } = this.state;

        if(busyIndicator) {
            return <LoadingIndicator/>
        }

        return (
        <Container className="container">
            <Segment inverted>
                <Header as="h1" content="Log In" textAlign="center"/>
                {error && 
                <Message
                    error
                    header={errMessage}
                />}
                <Form inverted>
                    <Form.Field>
                        <Form.Input 
                        label='Email' 
                        placeholder='Email' 
                        name="email"
                        onChange={this.handleChange}
                        value={authUser.email}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input 
                        label='Password' 
                        placeholder='Password' 
                        name="password"
                        onChange={this.handleChange}
                        value={authUser.password}/>
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button type='submit' primary onClick={this.loginUser}>Login</Button>
                </Form>
                <Header as="h3" textAlign="center">
                    New to System? &nbsp;<NavLink to="/signup">Sign Up</NavLink>
                </Header>
            </Segment>
        </Container>
        );
    }
}

export default Login;
