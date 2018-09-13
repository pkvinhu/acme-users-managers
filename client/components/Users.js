import React, {Component} from 'react'
import SingleUser from './SingleUser'
import axios from 'axios'

export default class Users extends Component {
  constructor(props){
  	super(props)
  	this.state = {
  	  current: ''
  	}
  	this.deleteUser = this.deleteUser.bind(this)
  }

  deleteUser(user){
  	axios.delete(`/api/users/${user.id}`)
  	this.props.allUsers()
  }

  render() {
  	const {users} = this.props
  	const {deleteUser} = this
  	return (
  	  <div>
  	    <h1>All Users</h1>
  	    <hr />
  	    {users.map(user=>{
  	      return (
  	      	<SingleUser user={user} key={user.id} deleteUser={deleteUser}/>
  	      )
  	    })}
  	  </div>
  	)
  }
}