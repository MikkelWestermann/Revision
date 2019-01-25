import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { NavLink, withRouter } from 'react-router-dom'
import logo from '../../GraphicalAssets/Revision_logo_medium.png';

import './NavBar.css';

import { signout, openSnackbar } from '../../actions';

const mapStateToProps = state => {
  return {
    isSignedIn: state.account.isSignedIn,
    isPending: state.account.isPending,
    username: state.account.username,
    email: state.account.email
  };
}

const mapDispatchToProps = dispatch => {
  return{
    handleSignOut: () => dispatch(signout()),
    handleOpenSnackBar: (message, variant) => dispatch(openSnackbar(message, variant))
  };
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgba(250, 250, 255, 0.8)'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing.unit,
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '90vh'
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '25px'
  },
  navigation: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  link: {
    color: '#9D37FC'
  }
});

class NavBar extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  onSignOut = () => {
    this.props.handleSignOut();
    this.handleDrawerClose();
    this.props.handleOpenSnackBar('Successfully Signed Out', 'success');
  }
  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open} className={classes.navBar}>
            <div className={classes.navigation}>
              {
                this.props.isSignedIn
                &&
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              }
              <Typography variant="h6" color="inherit" noWrap style={{marginLeft: `${this.props.isSignedIn ? 0 : '25px'}`}}>
                Revision
              </Typography>

            </div>
            {
              this.props.isPending
              &&
              <CircularProgress className={classes.progress} color="secondary" />
            }
            {
              this.props.isSignedIn
              &&
              <img alt='logo' src={logo} height='50px' width='50px' />
            }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.contentBody}>
            <div>
              <NavLink exact activeClassName="active" to="/account" className={classes.link} onClick={this.handleDrawerClose}>
                <ListItem button>
                  <ListItemText primary={this.props.username} secondary={this.props.email} />
                  <ListItemIcon><KeyboardArrowRight /></ListItemIcon>
                </ListItem>
              </NavLink>
              <Divider />
              <List>
                <NavLink exact activeClassName="active" to="/home" className={classes.link} onClick={this.handleDrawerClose}>
                  <ListItem button>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary='Home' />
                  </ListItem>
                </NavLink>
                <NavLink exact activeClassName="active" to="/yourgroups/groups" className={classes.link} onClick={this.handleDrawerClose}>
                  <ListItem button>
                    <ListItemIcon><ViewCarousel /></ListItemIcon>
                    <ListItemText primary='Your Groups' />
                  </ListItem>
                </NavLink>
                <NavLink exact activeClassName="active" to="/search" className={classes.link} onClick={this.handleDrawerClose}>
                  <ListItem button>
                    <ListItemIcon><Search /></ListItemIcon>
                    <ListItemText primary='Search' />
                  </ListItem>
                </NavLink>
              </List>
              <Divider />
            </div>
            <div>
              <NavLink exact activeClassName="active" to="/">
                <Button onClick={this.onSignOut} size="large" variant="contained" color="secondary" className={classes.button} style={{display: ''}}>
                  Sign Out
                </Button>
              </NavLink>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, { withTheme: true })(NavBar))));
