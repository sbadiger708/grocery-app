import React, { Component } from 'react';
import {Image, Table, Header, Button, Icon} from 'semantic-ui-react';
import {getAllCartItems, removeItemFromCart} from '../../services/groceryService';
import MenuHeader from '../Header/MenuHeader';
import LoadingIndicator from '../Loader/LoadingIndicator';

class Cart extends Component {
    state = {
        busyIndicator: true,
        cartItems: []
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        if(!loggedIn) {
            window.location.href = "/login";
        }
        this.getAllItems();
    }

    getAllItems = () => {
        getAllCartItems()
        .then(({ data }) => this.setState({busyIndicator:false, cartItems: data}))
        .catch(() => this.setState({busyIndicator: false}))
    }

    removeItem = (item) => {
        this.setState({busyIndicator: true});
        removeItemFromCart(item.id)
        .then(({ data }) => {
            console.log(data);
            this.getAllItems();
        }).catch((err) => console.log(err));
    }

    render() {
        const { userContext, loggedIn } = this.props;
        const { busyIndicator, cartItems } = this.state;
        console.log(cartItems);
        if(busyIndicator) {
            return <LoadingIndicator/>
        }
        return (
            <div>
               <MenuHeader userContext={userContext} loggedIn={loggedIn}/>
               <div style={{padding: '40px'}}>
                
                {cartItems.length === 0 && <Header as="h1" content="Seem you didn't added any Items into Cart!"/>}
                <Header as="h2" content="Cart Items!"/>
               <Table celled striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Grocery</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Remove</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {cartItems.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>
                        <Header as='h4' image>
                            <Image src={item.image} rounded size='medium' />
                            <Header.Content>
                            {item.name}
                            <Header.Subheader>{item.description}</Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        <Table.Cell>
                            <Button icon onClick={() => this.removeItem(item)}>
                                <Icon name='trash' color="red"/>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
               </div>
            </div>
        );
    }
}

export default Cart;
