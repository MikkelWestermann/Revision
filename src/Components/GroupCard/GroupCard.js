import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import { newAdd, removeAdd } from '../../actions';

const mapStateToProps = state => {
  return {
    id: state.account.id,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddAdd: (userId, groupId) => dispatch(newAdd(userId, groupId)),
    handleRemoveAdd: (userId, groupId) => dispatch(removeAdd(userId, groupId))
  }
}

const styles = {
  card: {
    minWidth: 275,
    minHeight: 350,
    margin: 25,
    textAlign: 'left'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  chip: {
    margin: 5,
  },
  groupHead: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 250,
    marginBottom: 25
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GroupCard extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onRemoveAdd = () => {

  }
  onAddAdd = () => {

  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.groupHead}>
              <div>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  By: {this.props.username}
                </Typography>
                <Typography variant="h5" component="h2">
                  {this.props.title}
                </Typography>
              </div>
              <CardActions>
                {
                  this.props.username === this.props.user
                  ?
                  <Tooltip title="Edit">
                    <Link to={`/editgroup/${this.props.id}`}>
                      <IconButton className={classes.button} aria-label="Edit">
                        <Edit color='primary' />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  :
                  <div>
                    {
                      this.props.id === this.props.userId
                      ?
                      <Tooltip title="Delete">
                        <IconButton className={classes.button} aria-label="Delete" onClick={this.handleClickOpen}>
                          <Delete color='primary' />
                        </IconButton>
                      </Tooltip>
                      :
                      <Tooltip title="Add">
                        <IconButton className={classes.button} aria-label="Add" onClick={this.props.handleAddAdd}>
                          <Add color='primary' />
                        </IconButton>
                      </Tooltip>
                    }
                  </div>
                }

              </CardActions>
            </div>
              {
                this.props.tags.map((tag, i) => {
                  return (
                    <Chip key={i} label={tag.tag_name} className={classes.chip} variant="outlined" />
                  )
                })
              }
          </CardContent>
        </Card>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Are you sure you want to delete:
            <br />
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              All progress with this group will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="outlined" onClick={this.handleClose} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GroupCard));
