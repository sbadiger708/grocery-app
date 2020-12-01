import React, { Component } from 'react';
import { Button, Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import './Signup.css';
import {signupUser} from '../../services/userService';
import {NavLink} from 'react-router-dom';
import LoadingIndicator from '../Loader/LoadingIndicator';

class Signup extends Component {
    state = {
        busyIndicator: false,
        newUser: {
            name: '',
            email: '',
            password: ''
        },
        error: false,
        errMessage: ''
    }

    handleChange = (event, data) => {
        const { name, value } = data;
        const { newUser } = this.state;
        newUser[name] = value;
        this.setState({ newUser });
    }    

    signupUser = () => {
        const { newUser } = this.state;
        this.setState({busyIndicator: true});
        signupUser(newUser)
        .then(({ data }) => {
            console.log(data);
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
        const { newUser, busyIndicator, error, errMessage } = this.state;
        if(busyIndicator) {
            return <LoadingIndicator/>
        }
        return (
        <Container className="container">
            <Segment inverted>
                <Header as="h1" content="Sign Up" textAlign="center"/>
                {error && 
                <Message
                    error
                    header={errMessage}
                />}
                <Form inverted>
                    <Form.Field>
                        <Form.Input 
                        label='Name' 
                        placeholder='Name' 
                        name="name"
                        onChange={this.handleChange}
                        value={newUser.name}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input 
                        label='Email' 
                        placeholder='Email' 
                        name="email"
                        onChange={this.handleChange}
                        value={newUser.email}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input 
                        label='Password' 
                        placeholder='Password' 
                        name="password"
                        onChange={this.handleChange}
                        value={newUser.password}/>
                    </Form.Field>
                    <Form.Field>
                    </Form.Field>
                    <Button type='submit' primary onClick={this.signupUser}>Sign Up</Button>
                </Form>
                <Header as="h3" textAlign="center">
                    Already have account? &nbsp;<NavLink to="/login">Login</NavLink>
                </Header>
            </Segment>
        </Container>
        );
    }
}

export default Signup;
