import React from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ProductService from '../services/ProductService';

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    const product = props.location.state.product || {}; // Retrieve product from state
    this.state = {
      id: product.id,
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      stockQuantity: product.stockQuantity || '',
      description: product.description || '',
      error: '',
      success: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, name, category, price, stockQuantity, description } = this.state;
    console.log("update ", id, { name, category, price, stockQuantity, description })
    ProductService.updateProduct(id, { name, category, price, stockQuantity, description })
      .then(() => {
        this.setState({ success: 'Product updated successfully.' });
        this.props.history.push('/admin/products');
      })
      .catch(err => {
        this.setState({ error: 'Failed to update product.' });
        console.error(err);
      });
  }

  render() {
    const { name, category, price, stockQuantity, description, error, success } = this.state;

    return (
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Edit Product</Card.Title>
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                {success && <Alert variant="success" className="text-center">{success}</Alert>}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label className="text-left">Name</Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={this.handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="formCategory">
                    <Form.Label className="text-left">Category</Form.Label>
                    <Form.Control type="text" name="category" value={category} onChange={this.handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="formPrice">
                    <Form.Label className="text-left">Price</Form.Label>
                    <Form.Control type="number" name="price" value={price} onChange={this.handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="formStockQuantity">
                    <Form.Label className="text-left">Stock Quantity</Form.Label>
                    <Form.Control type="number" name="stockQuantity" value={stockQuantity} onChange={this.handleChange} required />
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <Form.Label className="text-left">Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={description} onChange={this.handleChange} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" block>
                    Update Product
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(EditProduct);
