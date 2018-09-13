import React, {Component} from 'react'
import Form from './Form'
import axios from 'axios'

export default class UpdateUser extends Component {
  
  constructor(props){
  	super(props)
  	this.state={
  	  user: '',
  	  manager: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e){
  	e.preventDefault()
  	await axios.put(`/api/users/update/${this.props.id}`, this.state)
  	this.props.allUsers()
  }

  handleChange(e){
  	console.log(e.target.name, e.target.value)
  	this.setState({
  	  [e.target.name]: e.target.value
  	})
  }

  componentDidMount(){
  	axios.get(`/api/users/${this.props.id}`)
  	.then(res=>{
  		console.log('user: ', res.data.name, 'manager: ', res.data.manager)
  		this.setState({user: res.data.name, manager: res.data.manager ? res.data.manager.name : ''})
  	})
  }


  render(){
  	const {users} = this.props
  	const {handleSubmit, handleChange} = this;
  	const {user, manager} = this.state
  	return (
  	  <div>
  	    <h1>Update a User</h1>
  	    <hr />
  	    <form onSubmit={handleSubmit}>
  	    <Form users={users}
  	          user={user}
  	          manager={manager}
  	    	  managerName='manager'
  	    	  userName='user'
  	    	  handleChange={handleChange}/>
  	    <button>Update</button>
  	    </form>
  	  </div>
  	)
  }
}