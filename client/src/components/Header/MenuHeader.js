import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Header, Input, Menu, Modal } from 'semantic-ui-react'

class MenuHeader extends Component {
    state = { 
        activeItem: 'home',
        logout: false 
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        if(!loggedIn) {
            window.location.href = '/login';
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({logout: false});
        window.location.href = '/login';
    }

    render() {
        const { activeItem, logout } = this.state;
        const { userContext } = this.props;
        return (
            <div>
            <Menu inverted style={{padding: '5px'}}>
                <Menu.Item
                name='home'
                icon="home"
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                as={NavLink} 
                to="/home"
                />
                <Menu.Item
                name='History'
                icon="history"
                active={activeItem === 'history'}
                onClick={this.handleItemClick}
                as={NavLink} 
                to="/history"
                />
                <Menu.Item
                name='Cart'
                icon="cart"
                active={activeItem === 'cart'}
                onClick={this.handleItemClick}
                as={NavLink} 
                to="/cart"
                />
                <Menu.Menu position='right'>
                <Header as="h4" content={`Hello, ${userContext.user_name}`} 
                style={{color: 'white', margin: 'auto', marginRight: '15px'}}/>
                <Menu.Item
                name='logout'
                icon="shutdown"
                active={activeItem === 'logout'}
                onClick={() => this.setState({ logout: true })}
                />
                </Menu.Menu>
            </Menu>
            {logout && 
            <Modal
                onClose={() => this.setState({logout: false})}
                open={logout}
                closeIcon
                >
                <Modal.Header>Confirm Logout!</Modal.Header>
                <Modal.Content >
                <Header as="h3" content="Are you sure, you want to logout?"/>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    onClick={this.handleLogout} 
                    primary floated="right"
                    style={{marginBottom: '20px' }}>Confirm</Button>
                </Modal.Actions>
                </Modal>}
            </div>
        );
    }
}

export default MenuHeader;
