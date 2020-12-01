import React, { Component } from 'react';
import MenuHeader from '../Header/MenuHeader';
import { getPayments } from '../../services/PaymentService';
import {Header, Table} from 'semantic-ui-react';
import LoadingIndicator from '../Loader/LoadingIndicator';

class History extends Component {
    state = {
        busyIndicator: true,
        payments: []
    }

    componentDidMount() {
        getPayments()
        .then(({ data }) => this.setState({ busyIndicator: false, payments: data}))
        .catch(() => this.setState({ busyIndicator: false }));
    }

    render() {
        const { userContext, loggedIn } = this.props;
        const { payments, busyIndicator } = this.state;
        if(busyIndicator) {
            return <LoadingIndicator/>
        }
        return (
            <div>
               <MenuHeader userContext={userContext} loggedIn={loggedIn}/>
               <div style={{padding: '40px'}}>
                <Header as="h2" content={`Hello ${userContext.user_name}, below is your Payment History!`}/>
               <Table celled padded>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Sl. No.</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Purchased At</Table.HeaderCell>
                    <Table.HeaderCell>Completed</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {payments.map((payment, i) => (
                    <Table.Row key={payment.id}>
                        <Table.Cell>{i+1}</Table.Cell>
                        <Table.Cell>{payment.name}</Table.Cell>
                        <Table.Cell>{payment.price}</Table.Cell>
                        <Table.Cell>{payment.purchased_at}</Table.Cell>
                        <Table.Cell>{payment.completed ? 'Yes' : 'No'}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
               </div>
            </div>
        );
    }
}

export default History;
