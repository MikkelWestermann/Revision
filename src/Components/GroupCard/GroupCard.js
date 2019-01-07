import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';

const styles = {
  card: {
    width: 275,
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
    width: 250
  }
};

class GroupCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
      <CardContent>
        <div className={classes.groupHead}>
          <div>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Username
            </Typography>
            <Typography variant="h5" component="h2">
              Title
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Num of cards
            </Typography>
          </div>
          <CardActions>
            <IconButton className={classes.button} aria-label="Delete">
              <Add color='primary' />
            </IconButton>
          </CardActions>
        </div>
          {
            this.props.tags.map((tag, i) => {
              return (
                <Chip key={i} label={tag} className={classes.chip} variant="outlined" />
              )
            })
          }
      </CardContent>
    </Card>
    );
  }
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(GroupCard);
