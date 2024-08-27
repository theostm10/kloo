import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Landing from './pages/LandingPage';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import NewProject from './components/NewProject';
import TeamList from './pages/TeamList';
import TeamDetail from './pages/TeamDetail';
import NewTeamPage from './pages/NewTeam';
import EditAccount from './pages/EditAccount';
import CreateSprint from './pages/CreateSprint';
import AddTeamMember from './pages/AddTeamMember';
import TaskDetail from './pages/TaskDetail';
import SprintTasks from './pages/SprintTasks.js'
import CreateTask from './pages/CreateTask';
import AssignUser from './pages/AssignUser';
import ManageUsers from './components/ManageUsers'; // Import the new component
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
        <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content-area">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/projects/:id/tasks/:id" component={TaskDetail} />
            <ProtectedRoute path="/projects/:id/sprints/:sprintId/tasks" component={SprintTasks} />
            <ProtectedRoute path="/projects/:id/add-sprint" component={CreateSprint} />
            <ProtectedRoute path="/projects/:id/add-task" component={CreateTask} />
            <ProtectedRoute path="/projects/:id/assign-user" component={AssignUser} />
            <ProtectedRoute path="/projects/new" component={NewProject} />
            <ProtectedRoute path="/projects/:id" component={ProjectDetail} />
            <ProtectedRoute path="/projects" component={ProjectList} />
            <ProtectedRoute path="/teams/new" component={NewTeamPage} />
            <ProtectedRoute path="/teams/:teamId/add-member" component={AddTeamMember} />
            <ProtectedRoute path="/teams/:id" component={TeamDetail} />
            <ProtectedRoute path="/teams" component={TeamList} />
            <ProtectedRoute path="/edit-account" component={EditAccount} />
            <ProtectedRoute path="/admin/users" component={ManageUsers} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}




export default App;
