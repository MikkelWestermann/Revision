import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '75%',
    height: 500
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    marginLeft: 20,
    marginRight: 20,
    width: 500,
  },
  answerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 200,
  }
};

class QuestionCard extends Component {
  render() {
    const { classes } = this.props;
    return(
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            From: { this.props.groupName }, By: {this.props.username}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.question}
          </Typography>
          {
            this.props.isList
            &&
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Separate your answers with a comma
            </Typography>
          }
          <form className={classes.answerForm}>
            <TextField
              id="answer"
              label="Your Answer"
              type="text"
              className={classes.textField}
              margin="normal"
            />
            <Button variant="contained" color="primary" className={classes.button}>
              Answer
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

QuestionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionCard);
