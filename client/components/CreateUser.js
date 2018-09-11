import React, { Component } from 'react'
import axios from 'axios'

export default class Create extends Component {
  constructor(props) {
  	super(props)
  	this.state={
  	  user:'',
  	  manager: '',
  	  cantCreate: false
  	}
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
  	const user = this.state.user
  	const manager = this.state.manager
  	const userNames = await this.props.users.map(user=>user.name)
  	if(!userNames.includes(user) && manager !== '') {
  	  await axios.post('/api/users/create', {user: 
  	  										{name: this.state.user}, 
  	  										 manager:this.state.manager})
  	  this.props.allUsers()
  	  this.setState({user: '',
		             manager: '',
		             cantCreate: false})
  	} 

  	else if(!userNames.includes(user) && manager === '') {
  	  await axios.post('/api/users/create', {user: {name:this.state.user}})
  	  this.props.allUsers()
  	  this.setState({user: '',
		             manager: '',
		             cantCreate: false})
  	} 

  	else {this.setState({cantCreate: true})}
  }

  handleChange(e){
  	this.setState({
  	  [e.target.name]: e.target.value
  	})
  	console.log(this.state.user)
  }

  render() {
  	const {users, managers} = this.props
  	const {user, cantCreate, manager} = this.state
  	const {handleChange, handleSubmit} = this
  	return (
  	  <div>
  	    <h1>Create a User</h1>
  	    <hr />
  	    <form onSubmit={handleSubmit}>
  	      <input type='text' 
  	      		 name='user' 
  	      		 value={user} 
  	      		 onChange={handleChange}></input>
 		  <select onChange={handleChange} name='manager'>
 		    <option>--none</option>
 		    {users.map(manager=>{
 		      return (
 		        <option key={manager.id}  
 		                value={manager.name}>{manager.name}</option>
 		      )
 		    })}
 		  </select>
 		  {cantCreate &&
 		  	<div style={{backgroundColor: 'yellow' }}>This User is already in the system!</div>
 		  }
 		 <button>Create</button>
  	    </form>
  	  </div>
  	)
  }
}