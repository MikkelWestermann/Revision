import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListWrap from '../../../Components/ListWrap/ListWrap';
import GroupCard from '../../../Components/GroupCard/GroupCard';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { Redirect } from 'react-router-dom';

import { addCardGroup } from '../../../actions';

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    groups: state.cardGroup.groups,
    adds: state.groupAdds.adds,
    username: state.account.username,
    userId: state.account.id,
    newGroupId: state.cardGroup.newGroupId,
  };
}

const mapDispatchToProps = dispatch => {
  return{
    addCardGroup: (title, userId, username) => dispatch(addCardGroup(title, userId, username)),
  };
}

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Groups = props => {
  return(
    <div className='listItem'>
      {
        props.groups.map(group => {
          return (
            <GroupCard
              key={group.id}
              id={group.id}
              title={group.title}
              userId={group.user_id}
              tags={group.tags}
              username={group.username}
              user={props.user}
            />
          )
        })
      }
      <Fab color="secondary" aria-label="Add" className={props.classes.fab} onClick={props.handleClickOpen}>
        <AddIcon />
      </Fab>
    </div>
  )
}

const Adds = props => {
  return(
    <div className='listItem'>
      {
        props.adds.map(add => {
          return (
            <GroupCard
              key={add.id}
              id={add.id}
              title={add.title}
              userId={add.user_id}
              tags={add.tags}
              username={add.username}
              user={props.user}
            />
          )
        })
      }
    </div>
  )
}

class YourGroups extends Component {
  state = {
    open: false,
    title: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = e => {
    this.setState({ title: e.target.value })
  }
  handleCreateGroup = () => {
    this.props.addCardGroup(this.state.title, this.props.userId, this.props.username)
  }
  render() {
    if (this.props.newGroupId) {
      return <Redirect to={`/editgroup/${this.props.newGroupId}`} />
    }
    const { classes } = this.props;
    return (
      <div>
        <h1 className='routeHeader'>Your Groups</h1>
        <ListWrap
          from='yourgroups'
          firstLink='groups'
          secondLink='adds'
        >
          <Route path="/yourgroups/groups" render={()=><Groups user={this.props.username} groups={this.props.groups} classes={classes} handleClickOpen={this.handleClickOpen}/>} />
          <Route path="/yourgroups/adds" render={()=><Adds user={this.props.username} adds={this.props.adds}/>} />
        </ListWrap>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"What's the title of your new Card Group?"}
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <TextField
              label="Title"
              value={this.state.title}
              onChange={this.handleChange}
              margin="normal"
            />
            <DialogContentText id="alert-dialog-slide-description">
              This can be changed later
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant='outlined' onClick={this.handleCreateGroup} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

YourGroups.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(YourGroups));
