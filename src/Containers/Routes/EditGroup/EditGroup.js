import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { getCards, addCard, removeCard, updateCard } from '../../../actions'

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: 50
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const mapStateToProps = state => {''
  return {
    isSignedIn: state.account.isSignedIn,
    userId: state.account.id,
    username: state.account.username,
    cards: state.cards.cards,
    groups: state.cardGroup.groups,
  };
}

const mapDispatchToProps = dispatch => {
  return{
    getCards: groupId => dispatch(getCards(groupId)),
    addCard: (question, answer, type, options, groupId) => dispatch(addCard(question, answer, type, options, groupId)),
    removeCard: id => dispatch(removeCard(id)),
    updateCard: (question, answer, type, options, id) => dispatch(updateCard(question, answer, type, options, id))
  };
}

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      group: this.props.groups.filter(group => {
        return group.id === parseInt(this.props.match.params.id);
      })
    }
  }
  componentDidMount() {
    this.setState({ title: this.state.group[0].title })
    this.props.getCards(this.props.match.params.id)
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{backgroundColor:'#fafaff', opacity: 0.75, padding: 25}}>
          <h1 className='routeHeader' style={{marginTop: 50}}>{this.state.title}</h1>
          <TextField
            id="outlined-name"
            label="Title"
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className={classes.root}>
        {
          this.props.cards.length
          ?
          this.props.cards.map((card, index) => {
            return (
              <ExpansionPanel key={card.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{index + 1}. {card.question}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                  <TextField
                    label="Question"
                    value={[`${card.id}question`] in this.state ? this.state[`${card.id}question`] : card.question}
                    onChange={this.handleChange(`${card.id}question`)}
                    margin="normal"
                    variant="outlined"
                  />
                  <Divider />
                  <FormControl component="fieldset" className={classes.formControl} >
                    <FormLabel component="legend">Card Type</FormLabel>
                    <RadioGroup
                      aria-label="Gender"
                      name="gender1"
                      className={classes.group}
                      value={this.state[`${card.id}type`]}
                      onChange={this.handleChange(`${card.id}type`)}
                    >
                      <FormControlLabel value="text" control={<Radio />} label="Text" />
                      <FormControlLabel value="list" control={<Radio />} label="List" />
                      <FormControlLabel value="multiple choice" control={<Radio />} label="Multiple Choice" />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    label="Answer"
                    value={[`${card.id}answer`] in this.state ? this.state[`${card.id}answer`] : card.answer}
                    onChange={this.handleChange(`${card.id}answer`)}
                    margin="normal"
                    variant="outlined"
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
          :
          <h1>
            No Cards, mate...
          </h1>
        }
    </div>
      </div>
    );
  }
}

EditGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditGroup));
