import React, { Component } from 'react';
import {Segment, Grid, Image, Header, Card, Button, Container, Modal, Label} from 'semantic-ui-react';
import {addToCart, getAllGroceries} from '../../services/groceryService';
import {addPayment} from '../../services/PaymentService';
import MenuHeader from '../Header/MenuHeader';
import LoadingIndicator from '../Loader/LoadingIndicator'; 

class Home extends Component {
    state = {
        busyIndicator: true,
        groceries: [],
        selectedGrocery: null,
        isPurchase: false,
        itemAddedSuccessfully: false
    }

    componentDidMount() {
        getAllGroceries()
        .then(({ data }) => this.setState({busyIndicator: false, groceries: data}))
        .catch(() => this.setState({busyIndicator: false}));
    }

    addToCart = (grocery) => {
        console.log(grocery.id);
        addToCart({grocery_id: grocery.id})
        .then(() => this.setState({ itemAddedSuccessfully: true }))
        .catch((err) => console.log(err));
    }

    handlePayment = () => {
        const { selectedGrocery } = this.state;
        addPayment({ grocery_id: selectedGrocery.id})
        .then(({ data }) => {
            console.log(data);
            this.setState({selectedGrocery: null, isPurchase: false});
        }).catch((err) => {
            console.log(err);
            this.setState({selectedGrocery: null, isPurchase: false})
        })
    }

    render() {
        const { userContext, loggedIn } = this.props;
        const { busyIndicator, groceries, isPurchase, selectedGrocery, itemAddedSuccessfully } = this.state;

        if(busyIndicator) {
            return <LoadingIndicator/>
        }

        return (
            <div style={{height: '100%'}}>
                <MenuHeader userContext={userContext} loggedIn={loggedIn}/>
                <div style={{padding: '40px'}}>
                <Header as="h2" content={`Welcome, ${userContext.user_name}, to Our Departmental Store!`}/>
                {groceries.length === 0 && <Header as="h2" content="Groceries Not found!"/>}
                 <Grid columns={3} stackable>
                    <Grid.Row>
                        {groceries.map((grocery) => (
                        <Grid.Column key={grocery.id}>
                            <Card style={{width: '100%', margin: '20px 0px 20px'}}>
                                <Image src={grocery.image} wrapped ui={false} 
                                label={{
                                    as: 'a',
                                    color: 'red',
                                    content: `${grocery.price}`,
                                    icon: 'rupee',
                                    ribbon: true,
                                  }}/>
                                <Card.Content>
                                    <Card.Header>{grocery.name}</Card.Header>
                                    <Card.Description>{grocery.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button 
                                        onClick={() => this.addToCart(grocery)}
                                        content="Add To Cart"
                                        style={{float: 'right'}}/>&nbsp;&nbsp;
                                    <Button 
                                        primary 
                                        content="Buy Now" 
                                        onClick={() => this.setState({selectedGrocery: grocery, isPurchase: true})}
                                        style={{float: 'right'}}/>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>

            {selectedGrocery && 
            <Modal
                onClose={() => this.setState({selectedGrocery: null, isPurchase: false})}
                open={isPurchase}
                closeIcon
                >
                <Modal.Header>Confirm Payment</Modal.Header>
                <Modal.Content >
                    Please Confirm below, to complete your purchase of <strong>{selectedGrocery.name}</strong>!
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setState({selectedGrocery: null, isPurchase: false})}>Cancel</Button>
                    <Button onClick={this.handlePayment} primary>Confirm</Button>
                </Modal.Actions>
                </Modal>}

                {itemAddedSuccessfully && 
                <Modal
                    onClose={() => this.setState({itemAddedSuccessfully: false})}
                    open={itemAddedSuccessfully}
                    closeIcon
                    >
                    <Modal.Content >
                    <Header as="h2" content="Successfully added to Cart!"/>
                    <Button 
                    onClick={() => this.setState({itemAddedSuccessfully: false})} 
                    positive floated="right"
                    style={{marginBottom: '20px' }}>OK</Button>
                    </Modal.Content>
                    </Modal>}
                </div>
            </div>
        );
    }
}

export default Home;
