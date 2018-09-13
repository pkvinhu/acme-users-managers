import React, { Component } from 'react'
import axios from 'axios'
import Form from './Form'

export default class Create extends Component {
  constructor(props) {
  	super(props)
  	this.state={
  	  user:'',
  	  manager: '',
  	  // img: '',
  	  cantCreate: false
  	}
  	this.handleChange = this.handleChange.bind(this)
  	this.handleSubmit = this.handleSubmit.bind(this)
  	// this.getImage = this.getImage.bind(this)
  }

  // async getImage(){
  // 	await axios.get('https://randomuser.me/api/')
  // 	.then(res=>{
  // 	  console.log(res.data)
  // 	  const image = res.data.results.picture
  // 	  this.setState({img: image})
  // 	})
  // }

  async handleSubmit(e){
  	e.preventDefault()
  	const user = this.state.user
  	const manager = this.state.manager
  	const userNames = await this.props.users.map(user=>user.name)
  	if(!userNames.includes(user) && manager !== '') {
  	  // await this.getImage()
  	  await axios.post('/api/users/create', {user: 
  	  										{name: this.state.user}, 
  	  										 manager:this.state.manager})
  	  this.props.allUsers()
  	  this.setState({user: '',
		             manager: '',
		             cantCreate: false})
  	} 

  	else if(!userNames.includes(user) && manager === '') {
  	  // await this.getImage()
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

  }

  render() {
  	const {users, managers} = this.props
  	const {user, cantCreate, manager} = this.state
  	const {handleChange, handleSubmit} = this
  	return (
  	  <div>
  	    <h1>Create a User</h1>
  	    <hr />
  	    {cantCreate &&
 		  	<strong style={{backgroundColor: 'yellow' }}>This User is already in the system!</strong>
 		  }
  	    <form onSubmit={handleSubmit}>
  	      <Form userName='user' 
  	            user={user} 
  	            managerName='manager' 
  	            handleChange={handleChange} 
  	            users={users} />
  	      <button>Create</button>
  	    </form>
  	  </div>
  	)
  }
}