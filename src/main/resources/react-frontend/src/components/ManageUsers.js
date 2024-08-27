import React from 'react';
import { Table, Button, Modal, Alert, Form } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
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
      showEditModal: false,
      selectedUser: {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
      },
      editError: '',
      roles: ['ROLE_ADMIN', 'ROLE_PROJECTMANAGER', 'ROLE_TEAMLEADER', 'ROLE_DEVELOPER', 'ROLE_TESTER', 'ROLE_UNASSIGNED'],
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

  handleEditShow = (user) => {
    this.setState({
      showEditModal: true,
      selectedUser: { ...user },
    });
  }

  handleEditClose = () => {
    this.setState({
      showEditModal: false,
      selectedUser: { firstName: '', lastName: '', email: '', role: '' },
      editError: '',
    });
  }

  handleEditSave = () => {
    const { selectedUser } = this.state;
    UserService.updateUser(selectedUser.id, selectedUser)
      .then(() => {
        this.setState({ showEditModal: false });
        this.loadUsers();
      })
      .catch(err => {
        this.setState({ editError: err.response.data.message || 'Failed to update user.' });
        console.error(err);
      });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      selectedUser: {
        ...prevState.selectedUser,
        [name]: value,
      }
    }));
  }

  render() {
    const roleMappings = {
      "ROLE_ADMIN": "Admin",
      "ROLE_PROJECTMANAGER": "Project Manager",
      "ROLE_TEAMLEADER": "Team Leader",
      "ROLE_DEVELOPER": "Developer",
      "ROLE_TESTER": "Tester",
      "ROLE_UNASSIGNED": "Unassigned"
    };

    const { users, error, showDeleteModal, deleteError, showEditModal, selectedUser, editError, roles } = this.state;

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
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{roleMappings[user.role] || user.role}</td>
                <td>
                  <Button variant="warning" size="sm" className="mr-2" onClick={() => this.handleEditShow(user)}>
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

        <Modal show={showEditModal} onHide={this.handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editError && <Alert variant="danger">{editError}</Alert>}
            <form>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={selectedUser.firstName || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={selectedUser.lastName || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={selectedUser.email || ''}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <Form.Control
                  as="select"
                  name="role"
                  value={selectedUser.role}
                  onChange={this.handleInputChange}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {roleMappings[role]}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEditClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ManageUsers;
