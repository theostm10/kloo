import React from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaPen, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import ProductService from '../services/ProductService';
import '../styles/ManageProducts.css';
import { withRouter } from 'react-router-dom';

class ManageProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: '',
      showModal: false,
      showDeleteModal: false,
      showAddModal: false,
      modalDescription: '',
      deleteProductId: null,
      newProduct: {
        name: '',
        category: '',
        price: '',
        stockQuantity: '',
        description: ''
      },
      addError: ''
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    ProductService.getAllProducts()
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        this.setState({ error: 'Failed to retrieve products.' });
        console.error(err);
      });
  }

  handleClose = () => {
    this.setState({ showModal: false, modalDescription: '' });
  }

  handleShow = (description) => {
    this.setState({ showModal: true, modalDescription: description });
  }

  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false, deleteProductId: null });
  }

  handleDeleteShow = (id) => {
    this.setState({ showDeleteModal: true, deleteProductId: id });
  }

  handleDeleteConfirm = () => {
    ProductService.deleteProduct(this.state.deleteProductId)
      .then(() => {
        this.setState({ showDeleteModal: false, deleteProductId: null });
        this.loadProducts(); // Reload products after deletion
      })
      .catch(err => {
        this.setState({ error: 'Failed to delete product.' });
        console.error(err);
      });
  }

  handleEdit = (product) => {
    this.props.history.push({
      pathname: `/admin/products/edit/${product.id}`,
      state: { product } // Pass the entire product object
    });
  }

  handleAddShow = () => {
    this.setState({ showAddModal: true });
  }

  handleAddClose = () => {
    this.setState({
      showAddModal: false,
      newProduct: {
        name: '',
        category: '',
        price: '',
        stockQuantity: '',
        description: ''
      },
      addError: ''
    });
  }

  handleAddChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      newProduct: {
        ...prevState.newProduct,
        [name]: value
      }
    }));
  }

  handleAddSubmit = (e) => {
    e.preventDefault();
    ProductService.createProduct(this.state.newProduct)
      .then(() => {
        this.handleAddClose();
        this.loadProducts(); // Reload products after addition
      })
      .catch(err => {
        this.setState({ addError: 'Failed to add product.' });
        console.error(err);
      });
  }

  render() {
    const { products, error, showModal, showDeleteModal, showAddModal, modalDescription, newProduct, addError } = this.state;

    return (
      <div className="manage-products-container">
        <h1>Manage Products</h1>
        {error && <p className="error">{error}</p>}
        <Table striped bordered hover className="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <Button variant="info" size="sm" className="mr-2" onClick={() => this.handleShow(product.description)}>
                    <FaEye />
                  </Button>
                  <Button variant="warning" size="sm" className="mr-2" onClick={() => this.handleEdit(product)}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => this.handleDeleteShow(product.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={this.handleAddShow}>
          <FaPlus /> Add Product
        </Button>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Product Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalDescription}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={this.handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAddModal} onHide={this.handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addError && <Alert variant="danger">{addError}</Alert>}
            <Form onSubmit={this.handleAddSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={newProduct.name} onChange={this.handleAddChange} required />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={newProduct.category} onChange={this.handleAddChange} required />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={newProduct.price} onChange={this.handleAddChange} required />
              </Form.Group>
              <Form.Group controlId="formStockQuantity">
                <Form.Label>Stock Quantity</Form.Label>
                <Form.Control type="number" name="stockQuantity" value={newProduct.stockQuantity} onChange={this.handleAddChange} required />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={newProduct.description} onChange={this.handleAddChange} required />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Add Product
              </Button>
              <Button variant="secondary" onClick={this.handleAddClose} block>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ManageProducts);
