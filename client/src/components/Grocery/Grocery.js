import React, { Component } from 'react';
import {Button, Form, Icon, Input, Modal, Table} from 'semantic-ui-react';
import {addNewGrocery, getAllGroceries, updateGroceryById} from '../../services/groceryService';
import LoadingIndicator from '../Loader/LoadingIndicator';

class Grocery extends Component {
    state = {
        busyIndicator: true,
        groceries: [],
        newGrocery: {
            name: '',
            description: '',
            image: '',
            price: 0
        },
        isEdit: false,
        editGrocery: null,
        selectedGrocery: null,
        addNewItem: false
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        if(!loggedIn) {
            window.location.href = "/login";
        }
        this.getGroceriesList()
    }

    getGroceriesList = () => {
        getAllGroceries()
        .then(({ data }) => this.setState({busyIndicator: false, groceries: data}))
        .catch(() => this.setState({busyIndicator: false}))
    }

    handleChange = (event, data) => {
        const { name, value } = data;
        const { newGrocery } = this.state;
        newGrocery[name] = value;
        this.setState({ newGrocery });
    } 

    addNewGrocery = () => {
        const {  newGrocery } = this.state;
        this.setState({busyIndicator: true });
        addNewGrocery(newGrocery)
        .then(() => {
            this.setState({addNewItem: false});
            this.getGroceriesList()
        })
        .catch(() => this.setState({busyIndicator: false,addNewItem: false}))
    }

    handleEditChange = (event, data) => {
        const { name, value } = data;
        const { editGrocery } = this.state;
        editGrocery[name] = value;
        this.setState({ editGrocery });
      }

    updateGrocery = () => {
        const { editGrocery } = this.state;
        this.setState({busyIndicator: true});
        updateGroceryById(editGrocery)
        .then(() => {
            this.setState({isEdit: false, selectedGrocery: false, editGrocery: null});
            this.getGroceriesList();
        }).catch(() => this.setState({isEdit: false, selectedGrocery: false, editGrocery: null, busyIndicator: false}))
    }
    

    render() {
        const { busyIndicator, groceries, addNewItem, isEdit, editGrocery, newGrocery } = this.state;
        if(busyIndicator) {
            return <LoadingIndicator/>
        }
        return (
            <div style={{padding: '40px'}}>
                <Button primary 
                floated="right" 
                style={{marginBottom: '20px'}}
                onClick={() => this.setState({ addNewItem: true })}>
                    Add New
                    </Button>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Sl. No.</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Image Url</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {groceries.map((grocery, i) => (
                        <Table.Row key={grocery.id}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{grocery.name}</Table.Cell>
                            <Table.Cell>{grocery.description}</Table.Cell>
                            <Table.Cell>{grocery.image}</Table.Cell>
                            <Table.Cell>{grocery.price}</Table.Cell>
                            <Table.Cell>
                                <Button icon onClick={() => this.setState({isEdit: true, editGrocery: grocery})}>
                                    <Icon name="pencil"/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>

            <Modal
                onClose={() => this.setState({addNewItem: false, isEdit: false})}
                open={addNewItem || isEdit}
                closeIcon
                >
                <Modal.Header>{isEdit ? 'Update Grocery' : 'Add New Grocery'}</Modal.Header>
                <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Name</label>
                        <Input
                        name="name"
                        placeholder="Name"
                        onChange={isEdit ? this.handleEditChange : this.handleChange}
                        value={isEdit ? editGrocery.name : newGrocery.name}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                        name="description"
                        placeholder="Description"
                        onChange={isEdit ? this.handleEditChange : this.handleChange}
                        value={isEdit ? editGrocery.description : newGrocery.description}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Image Url</label>
                        <Input
                        name="image"
                        placeholder="Image Url"
                        onChange={isEdit ? this.handleEditChange : this.handleChange}
                        value={isEdit ? editGrocery.image : newGrocery.image}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Price</label>
                        <Input
                        name="price"
                        placeholder="Price"
                        onChange={isEdit ? this.handleEditChange : this.handleChange}
                        value={isEdit ? editGrocery.price : newGrocery.price}/>
                    </Form.Field>
                    <Form.Field>
                        <Button primary onClick={isEdit ? this.updateGrocery : this.addNewGrocery}>Add New</Button>
                    </Form.Field>
                    </Form>
                </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Grocery;
