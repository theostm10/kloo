import React from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa'; // Import icons from react-icons
import UserService from '../services/UserService';
import '../styles/ManageUsers.css';

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      error: '',
      showDeleteModal: false,
      deleteUserId: null,
      deleteError: '',
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    UserService.getAllUsers()
      .then(data => {
        this.setState({ users: data });
      })
      .catch(err => {
        this.setState({ error: 'Failed to retrieve users.' });
        console.error(err);
      });
  }

  handleDeleteShow = (id) => {
    this.setState({ showDeleteModal: true, deleteUserId: id });
  }

  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false, deleteUserId: null, deleteError: '' });
  }

  handleDeleteConfirm = () => {
    UserService.deleteUser(this.state.deleteUserId)
      .then(() => {
        this.setState({ showDeleteModal: false, deleteUserId: null });
        this.loadUsers(); // Reload users after deletion
      })
      .catch(err => {
        this.setState({ deleteError: err.response.data.message || 'Failed to delete user.' });
        console.error(err);
      });
  }

  render() {
    const { users, error, showDeleteModal, deleteError } = this.state;

    return (
      <div className="manage-users-container">
        <h1>Manage Users</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Table striped bordered hover className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" size="sm" className="mr-2">
                    <FaPen />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => this.handleDeleteShow(user.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showDeleteModal} onHide={this.handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ManageUsers;
