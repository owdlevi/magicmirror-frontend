import React, { Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../../config/config'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit * 2,
    width: 20
  },
});

class AddMessage extends Component {
  state = {
    message: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSave = (name) => {
    const message = { message: this.state[name] }
    fetch( config.API_URL , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( message ),
      })
      .then(
        (result) => {
          console.log(result)
          this.setState({ [name]: '' } );
      })
  }

  render(){
    const { classes } = this.props;

    return <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h4">
          Add new message to show on Magic Mirror
        </Typography>
        <Typography component="div">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-message"
            label="Message"
            multiline
            rowsMax="4"
            className={classes.textField}
            value={this.state.message}
            onChange={this.handleChange('message')}
            margin="normal"
          />

          <Button variant="contained" color="primary" className={classes.button}
            onClick = {() => this.handleSave('message') }
            >
            Save
          </Button>
        </form>
        </Typography>
      </Paper>
    </div>
  }
}

export default withStyles(styles)(AddMessage)
