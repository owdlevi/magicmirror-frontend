import React, { Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import config from '../../config/config'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 400,
  },
});

class MessageList extends Component {

  state = {
    messages: [{message: 'Message 1'}, {message: 'Message 2'}]
  }

  updateMessageList = () => {
    fetch( config.API_URL , {
        headers: { "Content-Type": "application/json" },
      })
      .then( result => result.json())
      .then( result => {
        console.log(result.data)
          this.setState({ messages : result.data } )
      })
  }

  handleDelete = (id) => {
    console.log(id)
    fetch( `${config.API_URL}?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    .then(res => {
      this.updateMessageList()
    })
  }

  componentDidMount(){
    this.updateMessageList()
  }

  render(){
    const { classes } = this.props
    const messages = this.state.messages

    const tableRows = messages.map((message,index) => {
      let id = `${message._id}${index}`
      return (<TableRow key={id} >
        <TableCell component="th" scope="row">
          {message.message}
        </TableCell>
        <TableCell align="right">
        <Fab size="small" aria-label="Delete" className={classes.fab}
          onClick = {() => this.handleDelete(message._id) }>
          <DeleteIcon />
        </Fab>
        </TableCell>
      </TableRow>)
    })

    return <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </Paper>
      </div>
  }

}

export default withStyles(styles)(MessageList)
