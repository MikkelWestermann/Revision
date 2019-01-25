import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import NotSignedIn from '../../../Components/NotSignedIn/NotSignedIn';
import Edit from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import './Account.css';

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    username: state.account.username,
    email: state.account.email
  };
}

class Account extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        {
          this.props.isSignedIn
          ?
          <div>
            <div className='account'>
              <h1 className='routeHeader'>Account</h1>
              <div>
                <h2>Info</h2>
                <Fab color="secondary" aria-label="Edit" className='floatingButton' onClick={this.handleClickOpen}>
                  <Edit />
                </Fab>
              </div>
              <table className='userInfo'>
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>{this.props.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.props.email}</td>
                  </tr>
                  <tr>
                    <td>Joined</td>
                    <td>1/1 - 2019</td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>[Secret]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="account-info-dialog"
            >
              <DialogTitle id="account-info-dialog">{"Edit Your Account Info"}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  value={this.props.username}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={this.props.email}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="New Password"
                  type="password"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="passwordRepeat"
                  label="New Password Repeat"
                  type="password"
                  fullWidth
                />
                <DialogContentText style={{marginTop: '50px'}}>
                  You have to enter your current password to change account details.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="curPassword"
                  label="Current Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button variant="outlined" onClick={this.handleClose} color="primary" autoFocus>
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          :
          <NotSignedIn />
        }
      </div>
    );
  }
}

Account.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(withMobileDialog()(Account));
